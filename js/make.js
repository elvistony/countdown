var mode="duration"
    function changeMode(ele){
      mode = ele.value;
        document.getElementById('duration').classList.toggle('w3-hide');
        document.getElementById('time').classList.toggle('w3-hide');
    }    



    var d = new Date();
    document.getElementsByName('time_H')[0].innerText=d.getHours()+""
    function SaveSettings(){
      document.getElementById('save').innerText="Saved !";
      document.getElementById('save').classList.remove('w3-orange');
      document.getElementById('save').classList.add('w3-green');
      document.getElementById('save').classList.add('w3-hover-green');
      setTimeout(()=>{
        document.getElementById('save').innerText="Save Settings";
      document.getElementById('save').classList.remove('w3-green');
      document.getElementById('save').classList.add('w3-orange');
      document.getElementById('save').classList.remove('w3-hover-green');
      },2000)
      let time;
      if(mode=="duration"){
        time = document.getElementsByName('dur_H')[0].value +":"+document.getElementsByName('dur_M')[0].value +":"+document.getElementsByName('dur_S')[0].value;
      }else{
        time = document.getElementsByName('time_H')[0].value +":"+document.getElementsByName('time_M')[0].value +":"+document.getElementsByName('time_S')[0].value;
      }
      var jsn = {
        "title":document.getElementsByName('title')[0].value,
        "posttimer":document.getElementsByName('posttimer')[0].value,
        "youtubeID":youtube_parser(document.getElementsByName('youtubeID')[0].value),
        "mode":mode,
        "blur":document.getElementsByName('blur')[0].checked==true?true:false,
        "time":time,
        "msgs":document.getElementsByName('msgs')[0].value,
        "color":document.getElementsByName('colorcode')[0].value,
        "tint":document.getElementsByName('tint')[0].checked==true?true:false
      }
      console.log(JSON.stringify(jsn));
      setCookie(JSON.stringify(jsn))
    }

    function youtube_parser(url){
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }

    function setOptions(){
      var data = getCookie('Counter')
      if(data==""){
        setCookie('{"title":"The Event will begin in","posttimer":"a matter of moments","youtube_id":"hYgKv4ZxaCM","mode":"duration","blur":true,"time":"17:10"}')
        setOptions()
      }else{
          console.log(data);
        var parsed = JSON.parse(data)
        document.getElementsByName('title')[0].value = parsed["title"]
        document.getElementsByName('posttimer')[0].value = parsed["posttimer"]
        document.getElementsByName('youtubeID')[0].value ="https://www.youtube.com/watch?v="+parsed["youtubeID"]
        if(parsed["blur"]==true){
          document.getElementsByName('blur')[0].checked=true;
        }
        if(parsed["tint"]==true){
          document.getElementsByName('tint')[0].checked=true;
        }
        if(parsed['mode']=="duration"){
          document.getElementsByName('dur_H')[0].value = parsed['time'].split(':')[0]
          document.getElementsByName('dur_M')[0].value = parsed['time'].split(':')[1]
          document.getElementsByName('dur_S')[0].value = parsed['time'].split(':')[2]
        }else{
          document.getElementsByName('time_H')[0].value = parsed['time'].split(':')[0]
          document.getElementsByName('time_M')[0].value = parsed['time'].split(':')[1]
          document.getElementsByName('time_S')[0].value = parsed['time'].split(':')[2]  
        }
      }
      document.getElementsByName('msgs')[0].value=parsed['msgs'];
    }

    setOptions()