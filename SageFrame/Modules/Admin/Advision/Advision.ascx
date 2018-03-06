<%@ Control Language="C#" AutoEventWireup="true" CodeFile="Advision.ascx.cs" Inherits="Modules_Admin_Advision_Advision" %>

<script type="text/javascript">
    $(function () {
        $(this).SocialMarketing({
            modulePath: '<%=modulePath%>',
            portalID: '<%=portalID%>',
            userModuleID: '<%=userModuleID%>',
            siteCategory: '<%=siteCategory%>'
        });
    });
</script>

<div class="fieldset">

    <h1>Advision</h1>

    <div id="divBtns" class="sfButtonwrapper sfPadding">
    </div>

    <div class="divContent">

        <div class="divConfigureOnlinePresence">

            <div id="divChooser" class="inner" style="display: none;">

                <p class="sfNote">Define what you do to get more personalized recommendations. This will just take a few minutes.</p>
                <div class="option_advison">
                    <a id="divChoose" class="divToggle">Choose your presence online</a>
                    <span>/</span>
                    <a id="divConfused" class="divToggle">Confused ? Need our help </a>
                </div>
                <div id="divToggleChooseMenu" class="sfButtonwrapper sfPadding">

                    <button type="button" id="btnNextToChoosenPath" class="sfBtn smlbtn-succ icon-next">
                        <span>Next
                        </span>
                    </button>
                </div>

            </div>

            <div id="divChoosePresenceContainer" style="display: none;">
                <h2>Choose Your Presence Online</h2>

                <div id="chooserInnerContainer">

                    <div id="divSiteSector" class="sfFormwrapper">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Where are you in the industry ? </label>
                            </span>
                            <span class="formValue">
                                <select id="slcSiteSector" class="sfListmenu">
                                    <option value="0">Choose your Business Sector</option>
                                </select>
                            </span>
                        </div>
                    </div>


                    <div id="divSiteCategory" class="sfFormwrapper" style="display: none;">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Define your site.</label>
                            </span>
                            <span class="formValue">
                                <select id="slcSiteCategory" class="sfListmenu">
                                    <option value="0">Choose your site category</option>
                                </select>
                            </span>
                        </div>
                    </div>


                    <div id="divBusinessType" class="sfFormwrapper" style="display: none;">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Your Business Type.  </label>
                            </span>

                            <div class="formValue" id="divBusinessTypeComponents"></div>

                        </div>

                    </div>

                </div>

                <div id="divChoosePresenceContainerPostActions" class="sfButtonwrapper sfPadding">
                    <button type="button" id="backToMainChoose" class="sfLocale icon-close sfBtn smlbtn-danger">
                        <span>Cancel</span>
                    </button>

                    <button type="button" id="btnNextToKeyWords" class="sfBtn smlbtn-succ icon-next">
                        <span>
                            <%--<i class="fa fa-arrow-next"></i>--%>
                            Next
                        </span>
                    </button>
                </div>
            </div>

            <div id="divKeywordContainer">

                <p class="sfNote">Add topics to get more personalized recommendations. </p>

                <div id="divChooseKeywordsInnerContainer">

                    <div id="divKeywordsSelector" class="sfFormwrapper">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Choose a few topics that interests you</label>
                            </span>
                            <div class="formValue" id="divPersonalKeywords">
                            </div>
                            <div id="divChooseKeywordsPostActions" class="sfButtonwrapper sfPadding">
                                <button style="display: none;" type="button" id="backToChoose" class="sfLocale icon-close sfBtn smlbtn-danger icon-close">
                                    <span>Cancel</span>
                                </button>

                                <button type="button" id="btnFinalizeChoose" class="sfBtn smlbtn-succ icon-update ajaxLoaderInit">
                                    <span>
                                        <%--<i class="fa fa-arrow-next"></i>--%>
                            Next
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="divHelpChooseContainer" class="sfFormwrapper" style="display: none">
                <p class="sfNote">Let us help you choose. Pick a few topics that you think might be related to you.</p>

                <div id="helpChooseInnerContainer">
                    <div id="helpWordSelector">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Pick a few topics that you are involved with ? </label>
                            </span>
                            <div class="formValue keyWords" id="divHelpContainer"></div>
                        </div>
                    </div>
                    <div id="divHelpChooseContainerPostActions" class="sfButtonwrapper sfPadding">
                        <button type="button" id="backToMainConfused" class="sfLocale icon-close sfBtn smlbtn-danger" id="btnCancelBusinessTypeView">
                            <span>Cancel</span>
                        </button>

                        <button type="button" id="btnHelpFind" class="sfBtn smlbtn-succ icon-search">
                            <span>
                                <%--<i class="fa fa-arrow-next"></i>--%>
                            Find
                            </span>
                        </button>

                    </div>
                </div>




            </div>


            <div id="divHelpResultContainer" style="display: none">

                <h2>We have found <span id="searchCount">4</span> matching result(s).</h2>
                <p class="sfNote">
                    Choose from one of the following business sectors that we found. You can always go back and choose again.
                </p>

                <div id="helpResult">

                    <div id="helpResultSiteSector">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Does any of these define your business sector ?</label>
                            </span>
                            <select id="slcHelpResultSector" class="sfListmenu">
                                <option value="0">Choose your Business Sector</option>
                            </select>

                        </div>
                    </div>


                    <div id="helpResultSiteCategory" style="display: none">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Does your site belong to any of these categories ?</label>
                            </span>
                            <select id="slcHelpResultSiteCategory" class="sfListmenu">
                                <option value="0">Choose a site category</option>
                            </select>
                        </div>
                    </div>

                    <div id="helpResultBusinessType" style="display: none;">
                        <div class="sfFieldset">
                            <span class="formKey">
                                <label class="sfFormlabel">(*) Are these you business types ? </label>
                            </span>
                            <div class="formValue" id="divHelpResultBusinessTypeComponents"></div>
                        </div>
                    </div>
                </div>


                <div id="divHelpResultPostActions" class="sfButtonwrapper sfPadding">
                    <button type="button" id="backToHelpChoose" class="sfLocale icon-close sfBtn smlbtn-danger" id="btnCancelBusinessTypeView">
                        <span>Choose again</span>
                    </button>

                    <button type="button" id="btnHelpNextToKeywords" class="sfBtn smlbtn-succ icon-next">
                        <span>
                            <%--<i class="fa fa-arrow-next"></i>--%>
                            Next
                        </span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>
