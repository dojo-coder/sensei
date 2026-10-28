<?php
$total = 0;
for ($i = 1; $i <= 5; $i++) {
    if ($i % 2 == 0) {
        $total += $i;
    }
    echo $i, "\n";
}
