# API Catatan

[![Badge Github](https://img.shields.io/github/license/wiklapandu/api-catatan?style=flat)](https://github.com/wiklapandu/api-catatan/blob/master/LICENSE)
[![Badge Github](https://img.shields.io/badge/-wiklapandu-grey?style=flat&logo=github&logoColor=white&link=https://github.com/wiklapandu/)](https://www.github.com/wiklapandu/)
[![Badge Twitter](https://img.shields.io/badge/-wiklapandu-cd486b?style=flat&logo=instagram&logoColor=white&link=https://www.instagram.com/_wiklapandu/)](https://www.instagram.com/_wiklapandu/)

### Table of Content
- [Overview](#overview)
- [Requirements](#requirements)
- [Change ENV](#change-env)
    - [Application](#application)
    - [Databases](#databases)
- [How to Use](#how-to-use)
    - [Getting Data](#getting-data)
    - [Getting Data by Id](#getting-data-by-id)
    - [Post Data](#post-data)
    - [Updated Data by Id](#updated-data-by-id)
    - [Delete Data by Id](#delete-data-by-id)

## Overview
<p>
ini adalah source code rest api untuk Web App catatan.
</p>

untuk mencobanya tinggal **download**, atau clone

```bash
git clone https://github.com/wiklapandu/api-catatan.git
```

## Requirements
- Node js
- Mongoo DB
- [Hapi js](https://www.npmjs.com/package/@hapi/hapi)
- [NPM](https://www.npmjs.com/)
    - dotenv
    - htmlspecialchars
    - mongoose (library untuk databases Mongoo DB)

## Change ENV
<p>
    sebelum menggunakan ada baiknya untuk mengubah port atau host dari API ini.
</p>
<p>

untuk mengubah hapus `#` di depan key ENV (example: `#APP_HOST`).
</p>


#### APPLICATION

<table>
    <thead>
        <tr>
            <td>
                Key ENV
            </td>
            <td>
                Description
            </td>
            <td>
                Example
            </td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                APP_HOST
            </td>
            <td>
                untuk mengubah host server 
            </td>
            <td>
            APP_HOST=localhost
            </td>
        </tr>
        <tr>
            <td>
                APP_PORT
            </td>
            <td>
                untuk mengubah port server
            </td>
            <td>
                APP_PORT=5000
            </td>
        </tr>
    </tbody>
</table>

#### DATABASES

<table>
    <thead>
        <tr>
            <td>Key ENV</td>
            <td>Description</td>
            <td>Example</td>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>
                DB_HOST
            </td>
            <td>
                mengatur tempat/host databases
            </td>
            <td>
                DB_HOST=mongodb://127.0.0.1:27017/catatan
            </td>
        </tr>
    </tbody>
</table>

## How to Use

#### Getting Data
- URL: `/` dan `/catatan`
    - Method `GET`
    - Success Response:
        - Code: `200` <br>
        Content:

            ```json
            {
                "status": "success",
                "notes": [
                    {
                        "tags":[
                            "tags",
                            "tags",
                            "tags",
                        ],
                        "_id":"60fbe86c953fd12168a63731",
                        "title":"title",
                        "body":"note catatan",
                        "createdAt":"2021-07-24T10:16:12.427Z",
                        "updateAt":"2021-07-24T10:16:12.427Z",
                    }
                ],
            }
            ```
    - Sample call
    ```javascript
        $.ajax({
            url: "http://localhost:5000/catatan",
            method: 'GET',
            success: ({ notes }) => {
                $('ul#notes')
                    .append($.map(notes, (note) => {
                        return `
                            <li class="list-group-item list-group-item-action">
                                <a href="/catatan/${note._id}" class="text-dark">
                                    <span class="d-flex">
                                        <h5>${note.title}</h5>
                                        <small class="ms-auto">${note.createdAt.split('T')[0].split('-').reverse().join('-')}</small>
                                    </span>
                                    <p>${note.tags.join(', ')}</p>
                                </a>
                            </li>`;
                    }))
            }
        });
    ```
#### Getting Data by Id
- URL: `/catatan/{id}`
    - Method `GET`
    - URL Params
        - Required: 
            - `id` example: `60fbe86c953fd12168a63731`
    - Success Response:
        - Code: `200` <br>
            content: <br>
            ```json
            {
                "status": "success",
                "note":{
                    "tags":["satu","dua","tiga"],
                    "_id":"60fbe86c953fd12168a63731",
                    "title":"ada isinya",
                    "body":"catatan title kosong",
                    "createdAt":"2021-07-24T10:16:12.427Z",
                    "updatedAt":"2021-07-24T10:16:12.427Z",
                    "__v":0
                    }
            }
            ```
    - Error Response:
        - Code: `400` <br>
            content: <br>
            ```json
            {
                "status": "fail",
                "message": "catatan tidak ditemukan",
            }
            ```
    - Sample call
    ```javascript
        $.ajax({
            url:
                `/catatan/60fbe86c953fd12168a63731`,
            method: 'GET',
            success: ({ note, message }) => {
                $('h3.title').text(note.title)
                $('#catatan').append(
                    /*html*/`
                    <div class="fs-2 textTitle">
                        ${note.title}
                    </div>
                    <hr>
                    <div class="fs-4 my-3">
                        ${note.tags.join(', ')}
                    </div>
                    <p>
                        ${note.body}
                    </p>
                    `
                );
            },
            error: ({ responseJSON: result }) => {
                $('#catatan').append(
                    /*html*/`
                    <div class= "fs-2 text-center">
                        ${result.message}
                    </div>
                    `
                );
            }
        })
    ```
#### Post Data
- URL: `/catatan`
    - Method `POST`
    - Data Params <br>
        - required:
            - `title` type **string**
            - `tags` type **string** (example: "tags1,tags2,tags3") / dipisahkan `,`
            - `body` type **string**
    - Success Response:
        - Code: `200` <br>
        Content:

            ```json
            {
                "status": "success",
                "message": "catatan berhasil ditambahkan",
                "note": {
                        "tags":["satu","dua","tiga"],
                        "_id":"60fbe86c953fd12168a63731",
                        "title":"ada isinya",
                        "body":"catatan title kosong",
                        "createdAt":"2021-07-24T10:16:12.427Z",
                        "updatedAt":"2021-07-24T10:16:12.427Z",
                        "__v":0
                    }
            }
            ```
    - Error Response:
        - Code: `200` <br>
        Content:
            jika body kosong

            ```json
            {
                "status": "fail",
                "message": "Body tidak boleh kosong",
            }
            ```
    - Sample call
    ```javascript
        $.ajax({
            url: "/catatan",
            method: 'POST',
            data: {
                title: $('form#formAdd div input#title').val(),
                tags: $('form#formAdd div input#tags').val(),
                body: $('form#formAdd textarea#body').val(),
            },
            success: ({ message }) => {
                $('form#formAdd').trigger('reset');
                setTimeout(() => {
                    $(location).attr('href', '/');
                }, 500);
            },
            error: ({ message }) => {
                console.log(message);
            }
        });
    ```
    - Notes <br>
        untuk upload data menngunakan ini
#### Updated Data by Id
- URL: `/catatan/{id}`
    - Method `PUT`
    - URL Params
        - Required: 
            - `id` example: `60fbe86c953fd12168a63731`
    - Data Params <br>
        - Optional:
            - `title` type **string**
            - `tags` type **string** (example: "tags1,tags2,tags3") / dipisahkan `,`
            - `body` type **string**
    - Success Response:
        - Code: `200` <br>
            content: <br>
            ```json
            {
                "status": "success",
                "message": "data telah diubah",
            }
            ```
    - Error Response:
        - Code: `400` <br>
            content: <br>
            ```json
            {
                "status": "fail",
                "message": "Gagal diubah, catatan tidak ditemukan",
            }
            ```
    - Sample call
    ```javascript
        $.ajax({
            url:
                `/catatan/60fbe86c953fd12168a63731`,
            method: 'PUT',
            data: {
                title: $('form#formEdit div input#title').val(),
                tags: $('form#formEdit div input#tags').val(),
                body: $('form#formEdit textarea#body').val(),
            },
            success: ({ message }) => {
                setTimeout(() => {
                    $(location).attr('href', '/');
                }, 500);
            },
            error: ({ message }) => {
                console.log(message);
            }
        })
    ```
#### Delete Data by Id
- URL: `/catatan/{id}`
    - Method `DELETE`
    - URL Params
        - Required: 
            - `id` example: `60fbe86c953fd12168a63731`
    - Success Response:
        - Code: `200` <br>
            content: <br>
            ```json
            {
                "status": "success",
                "message": "catatan telah dihapus",
            }
            ```
    - Error Response:
        - Code: `400` <br>
            content: <br>
            ```json
            {
                "status": "fail",
                "message": "Gagal menghapus, catatan tidak ditemukan",
            }
            ```
    - Sample call
    ```javascript
        $.ajax({
            url:
                `/catatan/60fbe86c953fd12168a63731`,
            method: 'DELETE',
            success: (result) => {
                $(location).attr('href', '/')
            }
            error:({message})=>{
                console.log(message)
            }
        })
    ```

