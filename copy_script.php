<?php
$src_mig = 'c:/laragon/www/Skirpsi Saja/skripsi-chikal/database/migrations/';
$dst_mig = 'c:/laragon/www/chikal-skripsi/database/migrations/';
$src_mod = 'c:/laragon/www/Skirpsi Saja/skripsi-chikal/app/Models/';
$dst_mod = 'c:/laragon/www/chikal-skripsi/app/Models/';

array_map('unlink', glob($dst_mig."*.*"));
array_map('unlink', glob($dst_mod."*.*"));

foreach(glob($src_mig."*.*") as $file) {
    copy($file, $dst_mig . basename($file));
}
foreach(glob($src_mod."*.*") as $file) {
    copy($file, $dst_mod . basename($file));
}
echo "Done copying.";
