<?php

require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

$name = $_POST['user_name'];
$phone = $_POST['user_phone'];
$comment = $_POST['user_comment'];

//$mail->SMTPDebug = 3;                               // Enable verbose debug output

//
$f_stat = fopen("stats.txt", 'a') or die("не удалось создать файл");
date_default_timezone_set('Asia/Vladivostok');
$str = date("Y-m-d H:i:s"); 
fwrite($f_stat, $str);
$str =  "\nЧеловек " .$name. ' оставил заявку, его телефон: '.$phone. ', Комментарий к заявке: '  .$comment.  PHP_EOL;
//$str += $name;
fwrite($f_stat, $str);
fclose($f_stat);
//


$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  																							// Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = ' '; // Ваш логин от почты с которой будут отправляться письма
$mail->Password = ' '; // Ваш пароль от почты с которой будут отправляться письма
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465; // TCP port to connect to / этот порт может отличаться у других провайдеров

$mail->setFrom(' '); // от кого будет уходить письмо?
$mail->addAddress(' ');     // Кому будет уходить письмо
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Заявка с сайта';
$mail->Body    = '' .$name . ' оставил заявку, его телефон ' .$phone. '<br>  Сообщение: ' .$comment;
$mail->AltBody = '';

if(!$mail->send()) {
    echo 'Error';
     $f_stat = fopen("stats.txt", 'a') or die("не удалось создать файл");
    fwrite($f_stat, "Ошибка при попытке отправить сообщение выше на почту\n\n");
//    fwrite($f_stat, $mail->ErrorInfo);
    fclose($f_stat);
} else {
    //!
	header('location: index.php');
	
		$f_stat = fopen("stats.txt", 'a') or die("не удалось создать файл");
    fwrite($f_stat, "Сообщение выше успешно доставлено на почту\n\n");
    fclose($f_stat);
}
?>
