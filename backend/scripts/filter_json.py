
import json

# character.json에서 캐릭터 이름 목록 가져오기
with open('/mnt/c/Users/ChoYangJin/Desktop/workspace/CSC4020-final-project/backend/json/character.json', 'r', encoding='utf-8') as f:
    characters = json.load(f)

character_names = {char['name'] for char in characters}

# 대상 JSON 파일 불러오기 (예: data.json)
with open('output.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# character_name이 character_names에 있는지 확인하여 필터링
filtered_data = [item for item in data if item['character_name'] in character_names]

# 결과를 새로운 JSON 파일로 저장
with open('filtered_data.json', 'w', encoding='utf-8') as f:
    json.dump(filtered_data, f, ensure_ascii=False, indent=2)