<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>NETRA - AI Newspaper Layout Tool</title>
    @php
        $manifestPath = public_path('.vite/manifest.json');
        $isDev = file_exists(public_path('hot'));
        $manifest = [];
        if (!$isDev && file_exists($manifestPath)) {
            $manifest = json_decode(file_get_contents($manifestPath), true);
        }
    @endphp

    @if ($isDev)
        <script type="module" src="http://localhost:5173/@vite/client"></script>
        <script type="module" src="http://localhost:5173/src/main.tsx"></script>
    @elseif (isset($manifest['index.html']))
        <link rel="stylesheet" href="{{ asset($manifest['index.html']['css'][0]) }}">
        <script type="module" src="{{ asset($manifest['index.html']['file']) }}"></script>
    @endif
</head>
<body class="h-full bg-[#f1efe9]">
    <div id="root"></div>
</body>
</html>
