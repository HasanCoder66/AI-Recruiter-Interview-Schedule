import Vapi from '@vapi-ai/web';
import { useSelector } from 'react-redux';

const InterviewSession = () => {
  const { questions, currentQuestionIndex } = useSelector(state => state.interview);
  const currentQuestion = questions[currentQuestionIndex];

//   const vapi = new Vapi({ apiKey: 'ea964b23-8aa2-47d0-8f67-6bef88ba8599' });

  const speakQuestion = () => {
    if (currentQuestion) {
      vapi.sendText(currentQuestion); // Vapi will speak it aloud
    }
  };

  useEffect(() => {
    speakQuestion();
  }, [currentQuestionIndex]);
};
