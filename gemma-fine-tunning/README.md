# AI 수학 선생님 (최우수상 수상)

**AI 수학 선생님**은 수학 관련 질문을 한국어로 처리하고 답변을 생성하는 AI 모델입니다. 이 프로젝트는 `Google Gemma 2B` 모델을 기반으로 하고 있으며, 수학 문제에 대한 정확하고 단계적인 해설을 제공합니다. LoRA기법을 통해 해당 모델을 Fine-tuning하여, 한국어로 된 수학적 질문에 대해 효율적인 답변을 할 수 있도록 학습되었습니다.

## 프로젝트 개요

이 프로젝트의 목표는 학생들이 수학 문제를 해결할 때 도움을 받을 수 있도록, 한국어로 정확하고 논리적인 해설을 제공하는 AI 선생님을 구축하는 것입니다. `Google Gemma 2B` 모델에 LoRA 기법을 적용하여, Hugging Face 데이터셋을 활용한 Fine-tuning을 수행하였습니다.

### 주요 기능

- 한국어로 된 수학 문제에 대한 답변 생성
- Hugging Face의 `Gemma-2B` 모델 기반
- LoRA 기법을 활용한 효율적인 Fine-tuning
- 4비트 양자화된 모델로 메모리 사용량 최적화

## Fine-tuning된 모델 다운로드

Fine-tuning된 모델은 Hugging Face Hub에서 다운로드할 수 있습니다. 아래 링크를 통해 모델 파일을 다운로드하여 사용해주세요. 

- [gemma-2b-math-korean-finetuned 모델 다운로드](https://huggingface.co/rlatg0123/gemma-2b-math-korean-finetuned/resolve/main/adapter_model.safetensors)

## 제출 보고서
- [AI 수학 선생님 아이디어 보고서](https://github.com/user-attachments/files/20241694/_AI.pdf)


