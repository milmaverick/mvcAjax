<?php

$numb= ceil($pageData[0]['count']/5);
for ($i=1; $i <= $numb; $i++)
{
   if($_POST['page']==$i) $cls="page-item active";
   else $cls ="page-item";
   echo '<li class="'.$cls.'"><a class="page-link"
        href="#"  onclick="pagination('.$i.')">'.$i.'</a></li>';
} ?>
