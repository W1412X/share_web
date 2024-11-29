import re
with open("./stopwords.txt", "r") as f:
    lines = f.readlines()
words = [word.replace("\n", "") for word in lines]
words = list(set(words))
chinese_word_pattern = re.compile(r'^[\u4e00-\u9fa5]+$')  # 只匹配纯中文汉字
filtered_words = [word for word in words if chinese_word_pattern.match(word)]
print(len(filtered_words))
with open("./selected_stopwords.txt", "w") as f:
    f.write("[")
    for ind in range(len(filtered_words)):
        f.write("\"{}\"".format(filtered_words[ind]))
        if(ind != len(filtered_words) - 1):
            f.write(",")
    f.write("]")
