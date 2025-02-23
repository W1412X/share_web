# sharesdu

> [old one](https://github.com/W1412X/share_web)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

### introduction    
- some forms's keys are not in the backend(such as article,post),so hide some key-value in the content  
- here's the standard  
  - if exsits key-value in the content,always in the front  
  - the format is 
    - key|value|DIVIDE|key|value ... ...
    - end is |END|  
    - no space