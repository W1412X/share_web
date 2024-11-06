f=open('./api.md','r')
lines=f.readlines()
s=''
for line in lines:
    s+=line 
s=list(s)
for ind in range(len(s) - 1, -1, -1):
    if s[ind] == '`':
        s.insert(ind, '\\')
s=''.join(s)
f=open('./api.md','w')
f.write(s)
