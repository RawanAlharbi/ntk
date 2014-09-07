<div class="widget-top">
    <div class="title dragHandle">
	{ widget:title } <div class="remove">×</div>
    </div>
</div>
    
<div class="widget-left">
    <div class=left-tab><label><input type="checkbox" rv-checked="widget:active" ></label></div>
    <div class='inlets'>
        <div rv-each-inlet="widget:ins" rv-title="inlet.title" rv-data-field="inlet.to" class='inlet'>&middot;</div>
    </div>
</div>

<div class="widget-body">
    <span class="text" rv-text="widget:in">AnalogOut Value</span><br>
    <input type="range" rv-value="widget:in" min="0" max="255"/><br>
    <span class="text" rv-text="widget:out">AnalogOut Value</span>
</div>

<div class="widget-right">
    <!--<div class='outlets'>
        <div class="outlet" rv-each-outlet="widget:outs" rv-text="outlet.title" rv-data-field="outlet.to"></div>
    </div>-->
</div>