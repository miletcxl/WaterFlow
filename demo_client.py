"""
Demo 客户端 - 连接 FastAPI SSE 服务器
演示如何使用 SSE 流式响应
"""
import json
import requests
import sseclient


def demo_sse_chat(server_url: str = "http://localhost:8000"):
    """
    使用 SSE 流式接收聊天响应
    """
    url = f"{server_url}/v1/chat/completions"
    
    payload = {
        "messages": [
            {"role": "user", "content": "你好，请介绍一下你自己"}
        ],
        "temperature": 0.7,
        "stream": True
    }
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
    }
    
    print(f"正在连接到服务器: {url}")
    print("=" * 50)
    
    try:
        response = requests.post(url, json=payload, headers=headers, stream=True)
        response.raise_for_status()
        
        # 使用 sseclient 解析 SSE 流
        client = sseclient.SSEClient(response)
        
        full_content = ""
        for event in client.events():
            if event.data:
                try:
                    data = json.loads(event.data)
                    
                    if "error" in data:
                        print(f"\n错误: {data['error']}")
                        break
                    
                    if data.get("content"):
                        content = data["content"]
                        full_content += content
                        print(content, end="", flush=True)
                    
                    if data.get("finish_reason"):
                        print(f"\n\n完成原因: {data['finish_reason']}")
                        break
                        
                except json.JSONDecodeError:
                    if event.data.strip() == "[DONE]":
                        print("\n\n流结束")
                        break
                    continue
        
        print("\n" + "=" * 50)
        print(f"完整响应:\n{full_content}")
        
    except requests.exceptions.RequestException as e:
        print(f"请求错误: {e}")


def demo_simple_chat(server_url: str = "http://localhost:8000"):
    """
    简单的 SSE 流式接收（不使用第三方库）
    """
    url = f"{server_url}/chat"
    
    payload = {
        "messages": [
            {"role": "user", "content": "用一句话解释什么是人工智能"}
        ],
        "temperature": 0.7
    }
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
    }
    
    print(f"正在连接到服务器: {url}")
    print("=" * 50)
    
    try:
        response = requests.post(url, json=payload, headers=headers, stream=True)
        response.raise_for_status()
        
        full_content = ""
        for line in response.iter_lines():
            if line:
                line_str = line.decode('utf-8')
                
                if line_str.startswith("data: "):
                    data_str = line_str[6:]  # 移除 "data: " 前缀
                    
                    if data_str.strip() == "[DONE]":
                        print("\n\n流结束")
                        break
                    
                    try:
                        data = json.loads(data_str)
                        
                        if "error" in data:
                            print(f"\n错误: {data['error']}")
                            break
                        
                        if data.get("content"):
                            content = data["content"]
                            full_content += content
                            print(content, end="", flush=True)
                        
                        if data.get("finish_reason"):
                            print(f"\n\n完成原因: {data['finish_reason']}")
                            break
                            
                    except json.JSONDecodeError:
                        continue
        
        print("\n" + "=" * 50)
        print(f"完整响应:\n{full_content}")
        
    except requests.exceptions.RequestException as e:
        print(f"请求错误: {e}")


def check_server_health(server_url: str = "http://localhost:8000"):
    """
    检查服务器健康状态
    """
    try:
        response = requests.get(f"{server_url}/health", timeout=5)
        response.raise_for_status()
        data = response.json()
        print(f"服务器状态: {data}")
        return True
    except requests.exceptions.RequestException as e:
        print(f"无法连接到服务器: {e}")
        return False


if __name__ == "__main__":
    server_url = "http://localhost:8000"
    
    print("=" * 50)
    print("FastAPI SSE 服务器 Demo 客户端")
    print("=" * 50)
    
    # 检查服务器状态
    if not check_server_health(server_url):
        print("\n请确保服务器正在运行:")
        print("  python server.py")
        print("\n或设置环境变量后运行:")
        print("  export BASE_URL=your_base_url")
        print("  export API_KEY=your_api_key")
        print("  export MODEL=your_model_name")
        print("  python server.py")
        exit(1)
    
    print("\n" + "=" * 50)
    print("Demo 1: 使用简单方式接收 SSE 流")
    print("=" * 50)
    demo_simple_chat(server_url)
    
    print("\n\n" + "=" * 50)
    print("Demo 2: 使用 sseclient 库接收 SSE 流")
    print("=" * 50)
    print("注意: 需要安装 sseclient-py: pip install sseclient-py")
    try:
        demo_sse_chat(server_url)
    except ImportError:
        print("sseclient-py 未安装，跳过此 demo")
        print("安装命令: pip install sseclient-py")

