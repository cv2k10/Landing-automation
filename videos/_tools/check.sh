#!/bin/bash
# run hyperframes check and summarise findings
npx --yes hyperframes@0.9.27 check --json 2>/dev/null | python3 -c "
import json,sys,collections
d=json.load(sys.stdin)
items=[]
def walk(o):
  if isinstance(o,dict):
    if 'severity' in o and 'code' in o: items.append(o); return
    for v in o.values(): walk(v)
  elif isinstance(o,list):
    for v in o: walk(v)
walk(d)
print('ok:',d.get('ok'),'findings:',len(items))
seen=collections.Counter()
for i in items:
  k=(i['severity'],i['code']); seen[k]+=1
  if seen[k]<=4: print(i['severity'],i['code'],'|',i.get('message','')[:260],'| t=',i.get('time'),'|',i.get('selector'))
print(seen)
"
