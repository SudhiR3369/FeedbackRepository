<%@ Control Language="C#" AutoEventWireup="true" CodeFile="RegistrationView.ascx.cs" Inherits="Modules_Registration_RegistrationView" %>
<script>
     $(function () {
         //var fun = $(this).TestimonialsViewsSlider({
         //  ,

         //  });
           userModuleID: '<%=userModuleID%>'
     });
  </script>

<div class="slideshow-container">
    <div class="slides">
       <h1 align="center">This is Registration View</h1>
    </div>

    <a class="prev" onclick="plusSlides(-1)">❮</a>
    <a class="next" onclick="plusSlides(1)">❯</a>
</div>