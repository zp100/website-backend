list_files = [
    '2of12inf.txt',
    'count_1w-100k.txt',
]

def wordlen(word: str) -> int:
    return len(word.strip())

word_list = set()
for list_file in list_files:
    with open(list_file, 'r') as file:
        new_words = set(file.readlines())
    if len(word_list) > 0:
        word_list = word_list.intersection(new_words)
    else:
        word_list = new_words

word_list = [ word.strip('$+^&!%') for word in word_list if wordlen(word) >= 3 ]
word_list.sort()

with open('word_list.txt', 'w') as file:
    file.writelines(word_list)
