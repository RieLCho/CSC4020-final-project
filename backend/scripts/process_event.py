import json
import os

def extract_event_names(input_file, output_file):
    # JSON 파일 읽기
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # event_name만 추출
    event_names = []
    seen_events = set()  # 중복 제거를 위한 set
    
    for item in data:
        if item['event_name'] not in seen_events:
            event_names.append({
                'id': len(seen_events) + 1,
                'name': item['event_name']
            })
            seen_events.add(item['event_name'])

    # 결과를 JSON 파일�� 저장
    with open(output_file, 'w', encoding='utf-8') as f:
        json.dump(event_names, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    # 현재 스크립트의 디렉토리를 기준으로 상대 경로 설정
    current_dir = os.path.dirname(os.path.abspath(__file__))
    input_file = os.path.join(current_dir, "output.json")
    output_file = os.path.join(current_dir, "event.json")
    extract_event_names(input_file, output_file)