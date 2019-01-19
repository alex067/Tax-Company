<?php

    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;
    require $_SERVER['DOCUMENT_ROOT'].'/vendor/autoload.php';

    function writeLog($error){
    $file = fopen($_SERVER['DOCUMENT_ROOT']."/logs/contact.txt", "w");
    fwrite($file, $error);
    fclose($file);
    }

  

    $todayDate = getDate();
    $dateString = "Date: ".$todayDate['mon']."/".$todayDate['mday']."/".$todayDate['year']; 
    $responseKey = $_POST["captcha"];
    $secretKey = "";
    $userIP = $_SERVER["REMOTE_ADDR"];
    $response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secretKey."&response=".$responseKey."&remoteip=".$_SERVER["REMOTE_ADDR"]), true);
    if ($response["success"] == false) {
        $errorMsg = "Failed captcha validation. IP: ".$userIP." ";
        writeLog($errorMsg.$dateString);
        print_r(404);
    }

    $userDetails = json_decode($_POST["jsonFile"], true);
    $userDetails["name"] = filter_var($userDetails["name"], FILTER_SANITIZE_STRING);
    $userDetails["message"] = filter_var($userDetails["message"], FILTER_SANITIZE_STRING);
    $userDetails["email"] = filter_var($userDetails["email"], FILTER_SANITIZE_EMAIL);
    $userDetails["phone"] = filter_var($userDetails["phone"], FILTER_SANITIZE_NUMBER_INT);

    //honey pot for bot spamming 
    if(isset($userDetails['emailaddress']) || isset($userDetails ['fullname'])){
        print_r(404);
    }
    else{

        $mail = new PHPMailer;
        /*$mail->isSMTP();
        $mail->SMTPAuth = true;
        $mail->SMTPSecure = 'tls';*/
        $mail->Host="smtp.ionos.com";
        $mail->Port = 587;
        $mail->Username = '';
        $mail->Password="";
        $mail->setFrom('', 'Contact Inquiry'.$userDetails['name']);
        $mail->addAddress('', 'No-Reply');
        $mail->Subject = 'Contact Inquiry'.$userDetails['name'];
        $mail->Body = "Sent From: ".$userDetails['name']."<br>"."Email: ".$userDetails['email']."<br>"."Tel: ".$userDetails['phone']."<br>"."Message: ".$userDetails['message']."<br>";
        $mail->isHTML(true);
        if($mail->send()){
            print_r(200);   
        }
        else{
            $errorMsg="Failed to send mail. Error: ".$mail->ErrorInfo." ";
            writeLog($errorMsg.$todayDate);
            print_r(405);
        }     
        
    }




?>