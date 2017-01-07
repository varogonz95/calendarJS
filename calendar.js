$.fn.calendarjs=function(){
    var calendarjs_cnt=1,
    cmd=new Date(),
    wdays=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
    months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],DOMString='',
    e=this,
    settings={
        //start_date:new Date(),
        preferredPosition:'bottom',
        from:'',
        to:'',
        target:'',
        modal:false,
        animate:false,
        outsideClose:false,
        style:{
            zIndex:2500
        }
        //...
    };

    this.val(cmd.toDateString());
    e.click(renderCalendar);

    function renderCalendar() {
        var c=createCalendar(cmd);
        $('body').append(c);
        position(c);
    }

    function exists(){
        return /*($('#calendarjs-0')[0]!==undefined)?true:*/false;
    }

    function renderTip(w,m){
        $(m).prepend(
            (w)?
            '<div id="calendarjs-tip" style="top:-30px;left:'+((m.outerWidth(true)-15)/2)+'px;border-color: transparent transparent #666 transparent;"></div>':
            '<div id="calendarjs-tip" style="top:'+(m.outerHeight()-1)+'px;left:'+((m.outerWidth(true)-15)/2)+'px;border-color:#666 transparent transparent transparent;"></div>'
        );
    }

    function position(c){
        var eo=e.offset(),
        ew=e.outerWidth(true),
        eh=e.outerHeight(true),
        cn=eo.left+((ew-c.outerWidth(true))/2),
        a=eo.top+eh;
        if((window.innerHeight-a)>=c.outerHeight(true)){
            c.offset({top:eo.top+eh+10,left:cn});
            renderTip(true,c);
        }
        else{
            c.offset({top:eo.top-c.outerHeight(true)-10,left:cn});
            renderTip(false,c);
        }
    }

    function createCalendar(md){
        console.log(new Date('2017-2-1 00:00:00').toDateString());
        var cmld=new Date(md.getFullYear(),md.getMonth()+1,0,0,0,0,0),
        pmld=new Date(md.getFullYear(),md.getMonth(),0,0,0,0,0),
        pmlw_os=pmld.getDate()-pmld.getDay(),
        md_cntr=1;

        DOMString='<div id="calendarjs" class="calendarjs"';
        //calendarjs_cnt++;

        DOMString+=' style="z-index:'+settings.style.zIndex+'"><div class="month-selector"><h4>'+
        '<button onclick="prevMonth(\''+md.toDateString()+'\')" class="btn-selector glyphicon glyphicon-menu-left"></button>'+months[md.getMonth()]+'<button onclick="nextMonth(\''+md.toDateString()+'\')" class="btn-selector glyphicon glyphicon-menu-right"></button></h4></div><table><thead><tr>';
        for(i=0;i<7;i++){DOMString+='<th>'+wdays[i]+'</th>';}
        DOMString+='</tr></thead><tbody><tr>';
        for(i=0; i<7;i++){
            if(i<pmld.getDay()){
                pmlw_os++;
                DOMString+='<td class="prev" data-d="\''+pmld.getFullYear()+'-'+(pmld.getMonth()+1)+'-'+pmlw_os+'\'" onclick="selectedDate(this)">'+pmlw_os+'</td>';
            }
            else{
                DOMString+='<td class="'+((md_cntr===md.getDate())?'active current':'current')+'" data-d="\''+md.getFullYear()+'-'+(md.getMonth()+1)+'-'+md_cntr+'\'" onclick="selectedDate(this)">'+md_cntr+'</td>';
                md_cntr++;
            }
        }
        DOMString+='</tr>';
        pmlw_os=1;
        for(i=1; i<6;i++){
            DOMString+='<tr>';
            for(j=0; j<7; j++){
                if(md_cntr<=cmld.getDate()){
                    DOMString+='<td class="'+((md_cntr===md.getDate())?'active current':'current')+'" data-d="\''+md.getFullYear()+'-'+(md.getMonth()+1)+'-'+md_cntr+'\'" onclick="selectedDate(this)">'+md_cntr+'</td>';
                    md_cntr++;
                }
                else {
                    DOMString+='<td class="next" data-d="\''+cmld.getFullYear()+'-'+(cmld.getMonth()+1)+'-'+pmlw_os+'\'" onclick="selectedDate(this)">'+pmlw_os+'</td>';
                    pmlw_os++;
                }
            }
            DOMString+='</tr>';
        }
        DOMString+='</tbody></table><div class="year-selector"><h5><button onclick="prevYear(\''+md.toDateString()+'\')" class="btn-selector glyphicon glyphicon-menu-left"></button>'+md.getFullYear()+
        '<button onclick="nextYear(\''+md.toDateString()+'\')" class="btn-selector glyphicon glyphicon-menu-right"></button></h5></div><hr>'+//'<hr style="padding:none;margin:0 auto;display:block;height:1px;background-color:#444;width:90%">'+
        '<div class="controls"><a class="accept" onclick="accept()"></a><a class="cancel" onclick="cancel()"></a></div></div>';

        return $($.parseHTML(DOMString));
    }

    prevMonth=function(d){
        cmd=new Date(d);
        cmd.setMonth(cmd.getMonth()-1);
        $('#calendarjs').remove();
        renderCalendar(cmd);
        e.val(cmd.toDateString());
    }
    nextMonth=function(d){
        cmd=new Date(d);
        cmd.setMonth(cmd.getMonth()+1);
        $('#calendarjs').remove();
        renderCalendar(cmd);
        e.val(cmd.toDateString());
    }
    nextYear=function(d){
        cmd=new Date(d);
        cmd.setFullYear(cmd.getFullYear()+1);
        $(' #calendarjs').remove();
        renderCalendar(cmd);
        e.val(cmd.toDateString());
    }
    prevYear=function(d){
        cmd=new Date(d);
        cmd.setFullYear(cmd.getFullYear()-1);
        $(' #calendarjs').remove();
        renderCalendar(cmd);
        e.val(cmd.toDateString());
    }
    selectedDate=function(t){
        $('#calendarjs table td').removeClass('active');
        $(t).addClass('active');
        e.val(new Date($(t).attr('data-d').replace(/'/g,'')+' 00:00:00').toDateString());
    }
}
