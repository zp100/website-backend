dir = './src/routes/pangrams/'
list_files = [
    '2of12inf.txt',
    'count_1w-100k.txt',
]

word_list = set()
for list_file in list_files:
    with open(f"{dir}{list_file}", 'r') as file:
        file_words = [ word.strip(' \n\t$+^&!%') for word in file.readlines() ]
        new_words = set([ word for word in file_words if len(word) >= 3 ])

    if len(word_list) > 0:
        word_list = word_list.intersection(new_words)
    else:
        word_list = new_words

word_list = [ f"{word}\n" for word in word_list ]
word_list.extend([ 'pangram\n', 'pangrams\n' ])
word_list.sort()

with open(f"{dir}word_list.txt", 'w') as file:
    file.writelines(word_list)
