import { useEffect, useRef, useState } from 'react';
import HanziWriter from 'hanzi-writer';

export default function Home() {
  const [char, setChar] = useState('你');
  const [isLoading, setIsLoading] = useState(true);
  const [debugInfo, setDebugInfo] = useState('');
  const writerRef = useRef<HanziWriter | null>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  // 销毁当前的 writer 实例
  const destroyWriter = () => {
    if (writerRef.current) {
      writerRef.current = null;
    }
    if (targetRef.current) {
      targetRef.current.innerHTML = ''; // 清空显示区域
    }
  };

  // 加载 Hanzi Writer 数据
  useEffect(() => {
    const loadData = async () => {
      if (!char) {
        setDebugInfo('字符为空，跳过加载');
        return;
      }
      
      setDebugInfo(`正在加载字符 "${char}" 的数据...`);
      try {
        await HanziWriter.loadCharacterData(char);
        setDebugInfo(`字符 "${char}" 数据加载完成`);
        setIsLoading(false);
      } catch (error: any) {
        console.error('Failed to load character data:', error);
        setDebugInfo(`加载字符 "${char}" 失败: ${error?.message || '未知错误'}`);
        setIsLoading(false);
      }
    };
    loadData();
  }, [char]);

  // 创建或更新 Hanzi Writer 实例
  useEffect(() => {
    if (!targetRef.current || isLoading) return;

    setDebugInfo(`正在创建字符 "${char}" 的书写实例...`);
    
    // 清理旧的实例
    destroyWriter();

    // 创建新实例
    if (char) {
      try {
        writerRef.current = HanziWriter.create(targetRef.current, char, {
          width: 200,
          height: 200,
          padding: 5,
          showOutline: true,
          strokeAnimationSpeed: 1,
          delayBetweenStrokes: 200,
          delayBetweenLoops: 1000,
        });
        setDebugInfo(`字符 "${char}" 的书写实例创建成功`);
      } catch (error: any) {
        console.error('Failed to create writer:', error);
        setDebugInfo(`创建字符 "${char}" 的书写实例失败: ${error?.message || '未知错误'}`);
      }
    }

    return () => {
      destroyWriter();
    };
  }, [char, isLoading]);

  const handleCharChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newChar = e.target.value;
    console.log('New character:', newChar);
    
    // 如果输入为空，直接更新
    if (!newChar) {
      destroyWriter();
      setChar('');
      setDebugInfo('输入框已清空');
      return;
    }

    // 获取最后一个字符（处理输入法组合状态）
    const lastChar = newChar[newChar.length - 1];
    
    // 检查是否是中文字符
    if (/[\u4e00-\u9fa5]/.test(lastChar)) {
      destroyWriter(); // 在更新新字符前销毁旧的显示
      setDebugInfo(`正在切换到新字符 "${lastChar}"...`);
      setIsLoading(true);
      setChar(lastChar);
    } else {
      // 如果不是中文字符，显示提示
      setDebugInfo('请输入中文字符');
    }
  };

  const handleAnimate = () => {
    if (writerRef.current) {
      writerRef.current.animateCharacter();
      setDebugInfo(`正在播放字符 "${char}" 的书写动画`);
    }
  };

  const handleQuiz = () => {
    if (writerRef.current) {
      writerRef.current.quiz();
      setDebugInfo(`开始字符 "${char}" 的书写练习，请在书写框中完成笔画顺序`);
    }
  };

  return (
    <div className="container">
      <h1>汉字书写练习</h1>
      <div className="controls">
        <input
          type="text"
          value={char}
          onChange={handleCharChange}
          placeholder="输入一个汉字"
          maxLength={1}
        />
        <button onClick={handleAnimate} disabled={isLoading}>显示笔画</button>
        <button onClick={handleQuiz} disabled={isLoading}>开始练习</button>
      </div>
      <div ref={targetRef} className="character-display" />
      {isLoading && <div className="loading">加载中...</div>}
      <div className="debug-info">{debugInfo}</div>
      
      <style jsx>{`
        .container {
          max-width: 800px;
          margin: 0 auto;
          padding: 2rem;
          text-align: center;
        }
        .controls {
          margin: 2rem 0;
        }
        input {
          padding: 0.5rem;
          font-size: 1.2rem;
          margin-right: 1rem;
        }
        button {
          padding: 0.5rem 1rem;
          margin: 0 0.5rem;
          font-size: 1rem;
          cursor: pointer;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
        }
        button:disabled {
          background-color: #ccc;
          cursor: not-allowed;
        }
        button:hover:not(:disabled) {
          background-color: #0051a2;
        }
        .character-display {
          margin: 2rem auto;
          width: 200px;
          height: 200px;
        }
        .loading {
          margin-top: 1rem;
          color: #666;
        }
        .debug-info {
          margin-top: 1rem;
          padding: 0.5rem;
          background-color: #f5f5f5;
          border-radius: 4px;
          font-size: 0.9rem;
          color: #666;
        }
      `}</style>
    </div>
  );
} 