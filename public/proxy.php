<?php

$method = isset($_SERVER['REQUEST_METHOD']) ? $_SERVER['REQUEST_METHOD'] : null;
$uri = isset($_GET['uri']) ? trim($_GET['uri'], '/') : null;

if (!$method) {
    header('Status: 500 Internal Server Error', true, 500);
    die('Could not determine request method');
}

if (!$uri) {
    header('Status: 400 Bad Request', true, 400);
    die('You must specify a twitter uri in which to proxy');
}

$request = new HttpRequest('http://api.twitter.com/1/' . $uri);
if ($method == 'POST') {
    $request->setMethod(HttpRequest::METH_POST);
    $request->setPostFields($_POST);
} else {
    $request->setMethod(HttpRequest::METH_GET);
    $request->setQueryData($_GET);
}

$response = $request->send();
$type = $response->getHeader('Content-Type');
$status = $response->getResponseCode();
if ($status != 200) {
    header('Status: ' . $status . ' ' . $response->getResponseStatus(), true, $status);
    if ($type) {
        header('Content-Type: ' . $type);
    }
    die($response->getBody());
}

header('Content-Type: application/json');
echo $response->getBody();