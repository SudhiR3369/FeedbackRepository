<%@ Control Language="C#" AutoEventWireup="true" CodeFile="CacheMaintenance.ascx.cs"
    Inherits="Modules_Admin_CacheMaintenance_CacheMaintenance" %>

<script  type="text/javascript">
    $(function() {

        $(this).CacheMaintenance({
            UserModuleID: '<%=ModuleID %>'
        });
    });

</script>

<div>
    <div id="divClearCache" style="width: 49%; float: left;">
        <fieldset>
            <legend>Clear Cache </legend>
            <div id="divBindCacheKey" >
            </div>
            <div class="sfButtonwrapper sftype1">
                <label id="btnSave" class="sfLocale icon-clear smlbtn-danger sfBtn">
                    Clear Cache</label>
            </div>
        </fieldset>
    </div>
    <div id="divHeavyCache" style="width: 49%; float: right;">
        <fieldset>
            <legend>Enable Cache </legend>
            <div >
                <table width="100%" id="tblHeavyCache">
                    <tr>
                        <th>
                            Check All
                        </th>
                        <th>
                            <input type="checkbox" id="chkCheckAllHeavyCache" class="sfCheckbox" />
                        </th>
                    </tr>
                    <tr>
                        <td>
                            <label id="lblFrontMenu" class="sfFormlabel">
                                Front Menu</label>
                        </td>
                        <td>
                            <input type="checkbox" id="chkFrontMenu" class="sfCheckbox" value="FrontMenu" name="chkHeavyCache" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label id="lblCustomSideMenu" class="sfFormlabel">
                                Side Menu</label>
                        </td>
                        <td>
                            <input type="checkbox" id="chkSideMenu" class="sfCheckbox" value="SideMenu" name="chkHeavyCache" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label id="lblFooterMenu" class="sfFormlabel">
                                Footer Menu</label>
                        </td>
                        <td>
                            <input type="checkbox" id="chkFooterMenu" class="sfCheckbox" value="FooterMenu" name="chkHeavyCache" />
                        </td>
                    </tr>
                </table>
            </div>
            <div class="sfButtonwrapper sftype1">
                <label id="btnEnableCache" class="icon-save smlbtn-succ sfBtn">
                    Save Heavy Cache Settings</label>
            </div>
        </fieldset>
    </div>
</div>
