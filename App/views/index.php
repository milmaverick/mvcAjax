<?php
if (isset($pageData)){
  if(isset($_SESSION['logged_user'])){

    foreach ($pageData as $comment) {
      ?>
      <div class='comment <?if ($comment['isPass']==0) echo "deleteElement";?>'  id="comment<?=$comment['id']?>">
        <div class="media">
          <img src='img/<?=$comment['img']?>' class="mr-3" alt='<?=$comment['name']?>'>
          <div class="media-body">
            ИМЯ: <?=$comment['name']?>  |  email: <?=$comment['email']?>
            <span class='res isChanged <?if ($comment['isChanged']==0) echo "displayNone";?>'> Изменен Админом</span>

            <span class='res resChange'  data-toggle="modal" data-target="#exampleModal" id='change<?=$comment['id']?>'>
              <a href='#' onclick='changeElement(<?=$comment['id']?>)'> Изменить</a>
            </span>

            <span class='res resDel <?if ($comment['isPass']==0) echo "displayNone";?>'  id='delete<?=$comment['id']?>'>
              <a href='#' onclick='deleteElement(<?=$comment['id']?>)'> Отклонить</a>
            </span>

            <span class='res resReturn <?if($comment['isPass']==1) echo "displayNone";?>'  id='return<?=$comment['id']?>'>
              <a href='#' onclick='accessElement(<?=$comment['id']?>)'> Пропустить</a>
            </span>

            <br> TEXT: <?=$comment['text']?>
          </div>
        </div>
      </div>
    <?	}
  }
  else
  foreach ($pageData as $comment) {
    ?>
    <div class="comment">
      <div class="media">
        <div class="media-body">
          ИМЯ: <?=$comment['name']?>  |  email: <?=$comment['email']?>
          <br> TEXT:<?=$comment['text']?>
        </div>
      </div>
    </div>
  <?	}
}
?>
