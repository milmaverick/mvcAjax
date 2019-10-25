<?php

 class IndexModel extends Model
 {
   public function getComm($page=1)
   {
   	 $tpg=($page-1)* 5 ;

     $query = 'SELECT * FROM `comments` ORDER BY `date` DESC LIMIT '.$tpg.', 5';
     $comments = $this->db->query($query)->fetchAll();
     return $comments;
   }

   public function pagination()
   {
   		// code...
   		$query = 'SELECT count(id) as count FROM `comments` WHERE `isPass`=1';
   		$pages = $this->db->query($query)->fetchAll();
      return $pages;
   }

 }
?>
