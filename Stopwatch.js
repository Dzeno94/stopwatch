

function  Stopwatch(id,delay=100){
  
      this.state = "paused";
      this.delay = delay;
      this.display = document.getElementById(id);
      this.value = 0;
      this.laps=[];
   
    
    this.formatTime =function (ms) {
      var hours   = Math.floor(ms / 3600000);
      var minutes = Math.floor((ms - (hours * 3600000)) / 60000);
      var seconds = Math.floor((ms - (hours * 3600000) - (minutes * 60000)) / 1000);
      var ds = Math.floor((ms - (hours * 3600000) - (minutes * 60000) - (seconds * 1000))/100);
  
      if (hours   < 10) {hours   = "0"+hours;}
      if (minutes < 10) {minutes = "0"+minutes;}
      if (seconds < 10) {seconds = "0"+seconds;}
      return hours+':'+minutes+':'+seconds+'.'+ds;
    }
    
      this.update=function() {
      if (this.state=="running") {
        this.value += this.delay;
      }
      this.display.innerHTML = this.formatTime(this.value);
    }
    
    this.start=function() {
      if (this.state=="paused") {
        this.state="running";
        if (!this.interval) {
          var t=this;
          this.interval = setInterval(function(){t.update();}, this.delay);
        }
      }
    }
    
    this.stop=function() {
         if (this.state=="running") {
        this.state="paused";
      if (this.interval) {
        clearInterval(this.interval);
        this.interval = null;
      }
         }
    }
    
    this.restart=function() {
      this.stop();
      this.value=0;
      this.update();
    }
    this.lap = function(){
        this.laps.push(this.value);
        this.updateLaps();
    }
    this.updateLaps= function (){
        let lapsDiv= document.getElementById("laps");
        lapsDiv.innerHTML="";
        for( let lap of this.laps){
               const lapTime=this.formatTime(lap);
               let lapSpan= document.createElement("span");
               const index=this.laps.findIndex(x=>x==lap);
               lapSpan.innerHTML=`Lap ${index+1}: `+lapTime;
               lapsDiv.appendChild(lapSpan);
        }
    }
    this.update();
  }
