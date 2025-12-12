"""
FastAPI 服务器 - 模型调用服务（SSE 流式响应）
从环境变量加载配置：BASE_URL, API_KEY, MODEL
自动从 .env 文件加载环境变量
"""
import os
import json
from typing import Optional
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import asyncio

# 自动加载 .env 文件中的环境变量
load_dotenv()

app = FastAPI(title="Model API Server", version="1.0.0")

# 配置 CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 从环境变量加载配置
BASE_URL = os.getenv("BASE_URL", "").rstrip("/")
API_KEY = os.getenv("API_KEY", "")
MODEL = os.getenv("MODEL", "")

# 验证配置
if not BASE_URL:
    raise ValueError("BASE_URL 环境变量未设置")
if not API_KEY:
    raise ValueError("API_KEY 环境变量未设置")
if not MODEL:
    raise ValueError("MODEL 环境变量未设置")


class ChatRequest(BaseModel):
    """聊天请求模型"""
    messages: list[dict[str, str]]
    temperature: Optional[float] = 0.7
    max_tokens: Optional[int] = None
    stream: bool = True


class ChatResponse(BaseModel):
    """聊天响应模型"""
    content: str
    finish_reason: Optional[str] = None


async def stream_model_response(messages: list, temperature: float = 0.7, max_tokens: Optional[int] = None):
    """
    流式调用模型 API
    """
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    # 构建请求体
    payload = {
        "model": MODEL,
        "messages": messages,
        "temperature": temperature,
        "stream": True
    }
    
    if max_tokens:
        payload["max_tokens"] = max_tokens
    
    # 确定 API 端点

    api_url = BASE_URL
    
    try:
        async with httpx.AsyncClient(timeout=60.0) as client:
            async with client.stream("POST", api_url, headers=headers, json=payload) as response:
                if response.status_code != 200:
                    error_text = await response.aread()
                    yield f"data: {json.dumps({'error': f'API 错误: {response.status_code} - {error_text.decode()}'})}\n\n"
                    return
                
                async for line in response.aiter_lines():
                    if line:
                        # SSE 格式：data: {...}
                        if line.startswith("data: "):
                            data_str = line[6:]  # 移除 "data: " 前缀
                            
                            if data_str.strip() == "[DONE]":
                                yield "data: [DONE]\n\n"
                                break
                            
                            try:
                                data = json.loads(data_str)
                                # 提取内容
                                if "choices" in data and len(data["choices"]) > 0:
                                    delta = data["choices"][0].get("delta", {})
                                    content = delta.get("content", "")
                                    finish_reason = data["choices"][0].get("finish_reason")
                                    
                                    if content:
                                        yield f"data: {json.dumps({'content': content, 'finish_reason': finish_reason})}\n\n"
                                    
                                    if finish_reason:
                                        yield f"data: {json.dumps({'content': '', 'finish_reason': finish_reason})}\n\n"
                            except json.JSONDecodeError:
                                continue
    except httpx.TimeoutException:
        yield f"data: {json.dumps({'error': '请求超时'})}\n\n"
    except Exception as e:
        yield f"data: {json.dumps({'error': f'请求错误: {str(e)}'})}\n\n"


@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "Model API Server",
        "model": MODEL,
        "base_url": BASE_URL,
        "status": "running"
    }


@app.get("/health")
async def health():
    """健康检查"""
    return {"status": "healthy", "model": MODEL}


@app.post("/v1/chat/completions")
async def chat_completions(request: ChatRequest):
    """
    聊天完成接口 - SSE 流式响应
    """
    if not request.messages:
        raise HTTPException(status_code=400, detail="messages 不能为空")
    
    return StreamingResponse(
        stream_model_response(
            messages=request.messages,
            temperature=request.temperature,
            max_tokens=request.max_tokens
        ),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


@app.post("/chat")
async def chat(request: ChatRequest):
    """
    简化的聊天接口 - SSE 流式响应
    """
    return await chat_completions(request)


if __name__ == "__main__":
    import uvicorn
    port = int(os.getenv("PORT", "8000"))
    uvicorn.run(app, host="0.0.0.0", port=port)

