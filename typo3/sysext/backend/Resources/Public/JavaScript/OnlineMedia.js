/*
 * This file is part of the TYPO3 CMS project.
 *
 * It is free software; you can redistribute it and/or modify it under
 * the terms of the GNU General Public License, either version 2
 * of the License, or any later version.
 *
 * For the full copyright and license information, please read the
 * LICENSE.txt file that was distributed with this source code.
 *
 * The TYPO3 project - inspiring people to share!
 */
define(["require","exports","jquery","TYPO3/CMS/Backend/Utility/MessageUtility","./Enum/KeyTypes","nprogress","TYPO3/CMS/Core/Ajax/AjaxRequest","TYPO3/CMS/Core/SecurityUtility","./Modal","./Severity"],(function(e,t,i,a,n,r,o,s,l,d){"use strict";return new class{constructor(){this.securityUtility=new s,i(()=>{this.registerEvents()})}registerEvents(){const e=this;i(document).on("click",".t3js-online-media-add-btn",t=>{e.triggerModal(i(t.currentTarget))})}addOnlineMedia(e,t){const i=e.data("target-folder"),n=e.data("online-media-allowed"),s=e.data("file-irre-object");r.start(),new o(TYPO3.settings.ajaxUrls.online_media_create).post({url:t,targetFolder:i,allowed:n}).then(async e=>{const t=await e.resolve();if(t.file){const e={actionName:"typo3:foreignRelation:insert",objectGroup:s,table:"sys_file",uid:t.file};a.MessageUtility.send(e)}else{const e=l.confirm("ERROR",t.error,d.error,[{text:TYPO3.lang["button.ok"]||"OK",btnClass:"btn-"+d.getCssClass(d.error),name:"ok",active:!0}]).on("confirm.button.ok",()=>{e.modal("hide")})}r.done()})}triggerModal(e){const t=e.data("btn-submit")||"Add",a=e.data("placeholder")||"Paste media url here...",r=i.map(e.data("online-media-allowed").split(","),e=>'<span class="label label-success">'+this.securityUtility.encodeHtml(e.toUpperCase(),!1)+"</span>"),o=e.data("online-media-allowed-help-text")||"Allow to embed from sources:",s=i("<div>").attr("class","form-control-wrap").append([i("<input>").attr("type","text").attr("class","form-control online-media-url").attr("placeholder",a),i("<div>").attr("class","help-block").html(this.securityUtility.encodeHtml(o,!1)+"<br>"+r.join(" "))]),c=l.show(e.attr("title"),s,d.notice,[{text:t,btnClass:"btn btn-primary",name:"ok",trigger:()=>{const t=c.find("input.online-media-url").val();t&&(c.modal("hide"),this.addOnlineMedia(e,t))}}]);c.on("shown.bs.modal",e=>{i(e.currentTarget).find("input.online-media-url").first().focus().on("keydown",e=>{e.keyCode===n.KeyTypesEnum.ENTER&&c.find('button[name="ok"]').trigger("click")})})}}}));