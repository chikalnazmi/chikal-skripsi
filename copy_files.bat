del /Q c:\laragon\www\chikal-skripsi\database\migrations\*
copy /Y "c:\laragon\www\Skirpsi Saja\skripsi-chikal\database\migrations\*" c:\laragon\www\chikal-skripsi\database\migrations\
copy /Y "c:\laragon\www\Skirpsi Saja\skripsi-chikal\app\Models\*" c:\laragon\www\chikal-skripsi\app\Models\
php artisan migrate:fresh
