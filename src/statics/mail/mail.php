<?php

require_once './swiftmailer/swift_required.php';

$url = '';
$nombre = '';
$empresa = '';
$email = '';
$telefono = '';
$sugerencia = '';

if (isset($_POST["url"])) {
	$url = $_POST["url"];
}
if (isset($_POST["nombre"])) {
	$nombre = $_POST["nombre"];
}
if (isset($_POST["empresa"])) {
	$empresa = $_POST["empresa"];
}
if (isset($_POST["email"])) {
	$email = $_POST["email"];
}
if (isset($_POST["telefono"])) {
	$telefono = $_POST["telefono"];
}
if (isset($_POST["sugerencia"])) {
	$sugerencia = $_POST["sugerencia"];
}

$completo = $url && $nombre && $empresa && $email && $telefono;

if ($completo) {
  $passwordFile = "password";
  $fh = fopen($_SERVER['DOCUMENT_ROOT']."/../".$passwordFile, 'r');
  $password = fgets($fh);
  fclose($fh);

  $transport = Swift_SmtpTransport::newInstance('ssl0.ovh.net', 465, 'ssl')
    ->setUsername('contacto@braunmarketingandconsulting.es')
    ->setPassword($password)
  ;

  $mailer = Swift_Mailer::newInstance($transport);

  $message = Swift_Message::newInstance();

  $headers  = "From: " .($email) . "\r\n";
  $headers .= "Reply-To: ".($email) . "\r\n";
  $headers .= "Return-Path: ".($email) . "\r\n";;
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
  $headers .= "X-Priority: 3\r\n";
  $headers .= "Message-ID: <".time()." TheSystem@".$_SERVER['SERVER_NAME'].">\r\n";
  $headers .= "X-Mailer: PHP". phpversion() ."\r\n";

  $message
    ->setSubject('Auditoría de '.$empresa)
    ->setFrom(array($email => $empresa))
    ->setTo(array('auditoria@braunmarketingandconsulting.es' => 'Braun Marketing & Consulting'))
    ->setBcc(array(
      'carlos@braunmarketingandconsulting.es' => 'Carlos - Braun Marketing & Consulting',
      'joaquin@braunmarketingandconsulting.es' => 'Joaquín - Braun Marketing & Consulting'
      ))
    ->setBody('<p>'.$url.'</p><p>'.'<p>'.$nombre.'</p><p>'.'<p>'.$empresa.'</p><p>'.$email.'</p><p>'.$telefono.'</p><p>'.$sugerencia.'</p>')
    ->addPart('<p>'.$url.'</p><p>'.'<p>'.$nombre.'</p><p>'.'<p>'.$empresa.'</p><p>'.$email.'</p><p>'.$telefono.'</p><p>'.$sugerencia.'</p>', 'text/html');

  $result = $mailer->send($message);
}

if ($result) {
  header("HTTP/1.1 202 Accepted");
} else {
  header("HTTP/1.1 406 Not Acceptable");
}

?>