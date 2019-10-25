<?php

require_once 'App/models/IndexModel.php';

class IndexController extends Controller {

	private $pageTpl = 'App/views/main.tpl.php';


	public function __construct() {
		$this->model = new IndexModel();
		$this->view = new View();
	}


	public function index() {
		$comments= $this->model->getComm();
		$this->pageData= $comments;
		$this->view->render('App/views/index.php', 	$this->pageTpl , $this->pageData);
	}

	public function pagination()
	{
		// code...
		$pages= $this->model->pagination();
		$this->pageData= $pages;
		$this->view->renderPartial('App/views/pagination.php', $this->pageData);

	}

	public function irsad()
	{
		$page= isset($_POST['page']) ? $_POST['page'] : 1;
		$comments= $this->model->getComm($page);
		$this->pageData= $comments;
		$this->view->renderPartial('App/views/index.php', $this->pageData);
	}




}
?>
