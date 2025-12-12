"""
交互式 Demo 客户端 - 连接 FastAPI SSE 服务器
手写 SSE 流式响应处理，无需第三方库
"""
import json
import requests
import sys


def parse_sse_stream(response):
    """
    手写 SSE 流解析器
    解析 Server-Sent Events 格式的数据流
    """
    buffer = ""
    for line in response.iter_lines():
        if line:
            line_str = line.decode('utf-8')
            buffer += line_str + "\n"
            
            # SSE 格式：data: {...}\n\n
            if line_str.startswith("data: "):
                data_str = line_str[6:]  # 移除 "data: " 前缀
                
                if data_str.strip() == "[DONE]":
                    yield {"done": True}
                    break
                
                try:
                    data = json.loads(data_str)
                    yield data
                except json.JSONDecodeError:
                    continue


def stream_chat(server_url: str, messages: list, temperature: float = 0.7):
    """
    发送聊天请求并流式接收响应
    """
    url = f"{server_url}/v1/chat/completions"
    
    payload = {
        "messages": messages,
        "temperature": temperature,
        "stream": True
    }
    
    headers = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
    }
    
    try:
        response = requests.post(url, json=payload, headers=headers, stream=True, timeout=60)
        response.raise_for_status()
        
        full_content = ""
        for data in parse_sse_stream(response):
            if "done" in data:
                break
            
            if "error" in data:
                print(f"\n❌ 错误: {data['error']}")
                return None
            
            if data.get("content"):
                content = data["content"]
                full_content += content
                print(content, end="", flush=True)
            
            if data.get("finish_reason"):
                print()  # 换行
                break
        
        return full_content
        
    except requests.exceptions.Timeout:
        print("\n❌ 请求超时")
        return None
    except requests.exceptions.RequestException as e:
        print(f"\n❌ 请求错误: {e}")
        return None


def check_server_health(server_url: str = "http://localhost:8000"):
    """
    检查服务器健康状态
    """
    try:
        response = requests.get(f"{server_url}/health", timeout=5)
        response.raise_for_status()
        data = response.json()
        return True, data
    except requests.exceptions.RequestException as e:
        return False, str(e)


def interactive_chat(server_url: str = "http://localhost:8000"):
    """
    交互式聊天循环
    """
    print("=" * 60)
    print("🤖 FastAPI SSE 服务器 - 交互式聊天客户端")
    print("=" * 60)
    
    # 检查服务器状态
    is_healthy, health_info = check_server_health(server_url)
    if not is_healthy:
        print(f"\n❌ 无法连接到服务器: {health_info}")
        print(f"\n请确保服务器正在运行:")
        print(f"  python server.py")
        print(f"\n或创建 .env 文件并设置环境变量:")
        print(f"  BASE_URL=your_base_url")
        print(f"  API_KEY=your_api_key")
        print(f"  MODEL=your_model_name")
        sys.exit(1)
    
    print(f"\n✅ 服务器连接成功: {server_url}")
    if isinstance(health_info, dict):
        print(f"   模型: {health_info.get('model', 'N/A')}")
    print()
    
    # 对话历史
    messages = []
    temperature = 0.7
    
    print("💡 提示:")
    print("  - 输入问题开始对话")
    print("  - 输入 '/temp <数值>' 设置温度 (0.0-2.0，默认 0.7)")
    print("  - 输入 '/clear' 清空对话历史")
    print("  - 输入 '/exit' 或 'quit' 退出")
    print("=" * 60)
    print()
    
    while True:
        try:
            # 获取用户输入
            user_input = input("👤 你: ").strip()
            
            if not user_input:
                continue
            
            # 处理命令
            if user_input.lower() in ['/exit', 'exit', '/quit', 'quit']:
                print("\n👋 再见！")
                break
            
            elif user_input.lower() == '/clear':
                messages = []
                print("✅ 对话历史已清空\n")
                continue
            
            elif user_input.startswith('/temp '):
                try:
                    temp_value = float(user_input.split()[1])
                    if 0.0 <= temp_value <= 2.0:
                        temperature = temp_value
                        print(f"✅ 温度已设置为: {temperature}\n")
                    else:
                        print("❌ 温度值必须在 0.0 到 2.0 之间\n")
                except (ValueError, IndexError):
                    print("❌ 无效的温度值，格式: /temp <数值>\n")
                continue
            
            # 添加用户消息到历史
            messages.append({"role": "user", "content": user_input})
            
            # 显示 AI 响应
            print("🤖 AI: ", end="", flush=True)
            response_content = stream_chat(server_url, messages, temperature)
            
            if response_content:
                # 添加 AI 响应到历史
                messages.append({"role": "assistant", "content": response_content})
            else:
                # 如果出错，移除最后一条用户消息
                messages.pop()
            
            print()  # 空行分隔
            
        except KeyboardInterrupt:
            print("\n\n👋 再见！")
            break
        except EOFError:
            print("\n\n👋 再见！")
            break
        except Exception as e:
            print(f"\n❌ 发生错误: {e}\n")


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="FastAPI SSE 服务器交互式客户端")
    parser.add_argument(
        "--url",
        type=str,
        default="http://localhost:8000",
        help="服务器地址 (默认: http://localhost:8000)"
    )
    
    args = parser.parse_args()
    interactive_chat(args.url)
