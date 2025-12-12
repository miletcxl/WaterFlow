import http from '@ohos.net.http';
import { BusinessError } from '@kit.BasicServicesKit';

/**
 * AI 服务工具类（真实服务流式请求版）
 * 默认指向本机 FastAPI 服务，请把 API_URL 换成你在同一局域网可访问的地址
 * 例如：`http://192.168.1.23:8000/v1/chat/completions`
 */
interface ChatMessage {
  role: string;
  content: string;
}

interface RequestPayload {
  messages: ChatMessage[];
  stream: boolean;
  temperature: number;
}

interface SSEData {
  content?: string;
  error?: string;
  finish_reason?: string;
}

export class AiService {
  // TODO: 将此地址改为你的服务器实际地址
  private static readonly API_URL = 'http://127.0.0.1:8000/v1/chat/completions';

  private static chatHistory: ChatMessage[] = [];

  /**
   * 发送消息并流式读取回复（SSE）
   */
  static async streamChat(
    userMessage: string,
    onContent: (content: string) => void,
    onError?: (error: string) => void,
    onComplete?: () => void
  ): Promise<void> {
    const userMsg: ChatMessage = { role: 'user', content: userMessage };
    AiService.chatHistory.push(userMsg);

    const payload: RequestPayload = {
      messages: [...AiService.chatHistory],
      stream: true,
      temperature: 0.7
    };

    const httpRequest = http.createHttp();
    let assistantContent = '';

    return new Promise<void>((resolve) => {
      // 发送请求
      httpRequest.request(
        AiService.API_URL,
        {
          method: http.RequestMethod.POST,
          header: {
            'Content-Type': 'application/json',
            'Accept': 'text/event-stream'
          },
          expectDataType: http.HttpDataType.STRING,
          extraData: JSON.stringify(payload),
        },
        (err: BusinessError | null, data: http.HttpResponse | null) => {
          if (err) {
            const errorMsg: string = err.message || '网络请求失败';
            onError?.(errorMsg);
            httpRequest.destroy();
            resolve();
            return;
          }

          if (!data) {
            onError?.('响应数据为空');
            httpRequest.destroy();
            resolve();
            return;
          }

          if (data.responseCode && data.responseCode >= 400) {
            const errorMsg: string = `HTTP ${data.responseCode}: ${data.result as string || '请求失败'}`;
            onError?.(errorMsg);
            httpRequest.destroy();
            resolve();
            return;
          }

          // 解析 SSE 流式响应
          const responseText: string = (data.result as string) || '';
          if (!responseText) {
            onError?.('响应内容为空');
            httpRequest.destroy();
            resolve();
            return;
          }

          // 按行解析 SSE 数据
          const lines = responseText.split('\n');
          let buffer = '';

          for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) {
              continue;
            }

            if (line.startsWith('data: ')) {
              const dataStr = line.substring(6); // 移除 "data: " 前缀
              
              if (dataStr.trim() === '[DONE]') {
                break;
              }

              try {
                const sseData: SSEData = JSON.parse(dataStr) as SSEData;
                
                if (sseData.error) {
                  onError?.(sseData.error);
                  httpRequest.destroy();
                  resolve();
                  return;
                }

                if (sseData.content) {
                  assistantContent += sseData.content;
                  onContent(sseData.content);
                }

                if (sseData.finish_reason) {
                  break;
                }
              } catch (e) {
                // 忽略解析异常，继续处理下一行
                continue;
              }
            } else {
              // 处理多行数据（累积到 buffer）
              buffer += line + '\n';
            }
          }

          // 保存完整的 AI 回复到历史
          if (assistantContent) {
            AiService.chatHistory.push({ role: 'assistant', content: assistantContent });
          }

          onComplete?.();
          httpRequest.destroy();
          resolve();
        }
      );
    });
  }

  static clearHistory(): void {
    AiService.chatHistory = [];
  }
}
