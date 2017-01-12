(function($){
    $_calendarjs_id_count_=0;

    $.fn.calendarjs=function(options){

        var settings=$.extend({
            //start_date:new Date(),
            theme:'light',
            from:'',
            to:'',
            target:'',
            solo:false,
            modal:false,
            //animate:false,
            outsideClose:false
            //...
        },options),
        cmd=new Date(),
        wdays=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'],
        months=['Jan','Feb','Mar','Apr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dec'],
        e=this,
        cal=renderCalendar(cmd,true),
        iv=e.val(cmd.toDateString()).attr('data-event','cjs-'+$_calendarjs_id_count_).click(function() {
            if(settings.solo){$('.calendarjs').fadeOut(250);}
            cal.fadeIn(250);
        }).val();

        $_calendarjs_id_count_++;
        function position(e,c){
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
            return c;
        }

        function renderTip(w,m){
            $(m).append(
                (w)?
                '<div class="calendarjs-tip top" style="top:-30px;left:'+((m.outerWidth(true)-30)/2)+'px"></div>':
                '<div class="calendarjs-tip bottom" style="top:'+(m.outerHeight()-1)+'px;left:'+((m.outerWidth(true)-30)/2)+'px"></div>'
            );
        }

        function renderCalendar(md,n){
            cmld=new Date(md.getFullYear(),md.getMonth()+1,0,0,0,0,0),
            pmld=new Date(md.getFullYear(),md.getMonth(),0,0,0,0,0),
            pmlw_os=pmld.getDate()-pmld.getDay(),
            md_cntr=1,
            DOMString='<tbody><tr>';
            for(i=0; i<7;i++){
                if(i<pmld.getDay()){
                    pmlw_os++;
                    DOMString+='<td class="prev" data-d="'+pmld.getFullYear()+'-'+(pmld.getMonth()+1)+'-'+pmlw_os+'">'+pmlw_os+'</td>';
                }
                else{
                    DOMString+='<td class="'+((md_cntr===md.getDate())?'active current':'current')+'" data-d="'+md.getFullYear()+'-'+(md.getMonth()+1)+'-'+md_cntr+'">'+md_cntr+'</td>';
                    md_cntr++;
                }
            }
            DOMString+='</tr>';
            pmlw_os=1;
            for(i=1; i<6;i++){
                DOMString+='<tr>';
                for(j=0; j<7; j++){
                    if(md_cntr<=cmld.getDate()){
                        DOMString+='<td class="'+((md_cntr===md.getDate())?'active current':'current')+'" data-d="'+md.getFullYear()+'-'+(md.getMonth()+1)+'-'+md_cntr+'">'+md_cntr+'</td>';
                        md_cntr++;
                    }
                    else {
                        DOMString+='<td class="next" data-d="'+cmld.getFullYear()+'-'+(cmld.getMonth()+1)+'-'+pmlw_os+'">'+pmlw_os+'</td>';
                        pmlw_os++;
                    }
                }
                DOMString+='</tr>';
            }
            DOMString+='</tbody>';
            if(!n){return $(DOMString);}
            else {
                var str='</div><div id="cjs-'+$_calendarjs_id_count_+'" class="calendarjs '+settings.theme+'" style="z-index:2500"><div class="month-selector"><button class="btn-selector prevMonth glyphicon glyphicon-menu-left"></button><h4>'+months[md.getMonth()]+'</h4><button class="btn-selector nextMonth glyphicon glyphicon-menu-right"></button></div><table><thead><tr>';
                for(i=0;i<7;i++){str+='<th>'+wdays[i]+'</th>';}
                str+='</tr></thead>';
                DOMString=str+DOMString+'</table><div class="year-selector"><button class="btn-selector prevYear glyphicon glyphicon-menu-left"></button><h5>'+md.getFullYear()+'</h5><button class="btn-selector nextYear glyphicon glyphicon-menu-right"></button></div><div class="controls"><a class="accept"></a><button title="Today" class="btn-selector today"></button><a class="cancel"></a></div>';

                return $(DOMString).appendTo('body');
            }
        }

        function selectedDate(c,t){
            c.find('td').removeClass('active');
            $(t).addClass('active');
            e.val(new Date($(t).attr('data-d')+' 00:00:00').toDateString());
        }

        function changeDate(d,t,o){
            switch (t) {
                case 't':
                    cmd=new Date();
                    cal.find('.month-selector>h4').text(months[cmd.getMonth()]);
                break;

                case 'm':
                    cmd.setMonth(cmd.getMonth()+o);
                    cal.find('.month-selector>h4').text(months[cmd.getMonth()]);
                break;

                case 'y':
                    cmd.setFullYear(cmd.getFullYear()+o);
                break;
            }
            cal.find('.year-selector>h5').text(cmd.getFullYear());
            cal.find('tbody').replaceWith(renderCalendar(cmd,false));
            cal.find('td').click(function(){selectedDate(cal,this);});
            e.val(cmd.toDateString());
        }

        cal.find('.accept').click(function(){
            iv=e.val();
            cal.fadeOut(250);
        });
        cal.find('.cancel').click(function(){
            e.val(iv);
            cal.fadeOut(250);
        });
        cal.find('.today').click(function(){changeDate(cmd.toDateString(),'t',-1)});
        cal.find('.prevMonth').click(function(){changeDate(cmd.toDateString(),'m',-1)});
        cal.find('.nextMonth').click(function(){changeDate(cmd.toDateString(),'m',1)});
        cal.find('.prevYear').click(function(){changeDate(cmd.toDateString(),'y',-1)});
        cal.find('.nextYear').click(function(){changeDate(cmd.toDateString(),'y',1)});
        position(e,cal).find('td').click(function(){selectedDate(cal,this)});
    }
}(jQuery));
