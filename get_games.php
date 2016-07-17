<?php
    $host_name  = "db530932398.db.1and1.com";
    $database   = "db530932398";
    $user_name  = "dbo530932398";
    $password   = "talisman.327";

    $connect = mysqli_connect($host_name, $user_name, $password, $database);
    if (mysqli_connect_errno()){
     echo "Failed to connect to server: " . mysqli_connect_error();
    }
    else{
      $status_in = $_GET["status"];
      $sql = "SELECT * FROM our_games WHERE status =" . $status_in ;
      $result = $connect->query($sql);

      echo '{"games":[';
      while($row = $result->fetch_assoc())
      {
        echo $row[gb_id];
        if( $row[id] < $rowCount) echo ',';
      }
      echo ']}';
      $connect->close();
    }
?>
