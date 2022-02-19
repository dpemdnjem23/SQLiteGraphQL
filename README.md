# Backend Take-Home Assignment

## Introduction

우선, 이 과제를 위해 귀한 시간 및 노력을 기울여 주실 것에 미리 감사의 말씀을 드립니다. 이 과제는 웹 서비스를 만들기 위한 다음과 같은 백엔드 기술력에 대한 지원자님의 지식을 보기 위한 과제입니다. 주요 스택은:

1. JavaScript
2. SQL
3. GraphQL
4. Apollo GraphQL Server

아마도, 위의 기술 스택들이 익숙하지 않을 수도 있음을 이해합니다. 하지만 이 과제에 대한 저희의 목적은 지원자가 다큐멘테이션, 레퍼런스 및 Apollo GraphQL에 대한 기본적인 개념을 얼마나 빠르게 이해할 수 있는가 입니다. (이 과제를 위한 Apollo GraphQL에 대한 컨셉은 1~2시간이면 익힐 수 있을 것으로 생각됩니다.)

물론 위의 기술에 대한 선제적 이해도에 따라 다르겠지만, 대략적으로 저희는 이 과제를 해내는데 3~4시간이면 충분하다고 생각합니다. 과제에 대한 궁금증이나 불확실하게 이해되는 부분이 있다면 언제든지 아래의 이메일을 통해 문의 주시길 바랍니다.

<footsketch@footsketch.com>.

## Before You Begin

지금 이 과제에는 아래와 같은 4가지 파일이 있습니다.:

1. index.js
2. package.json
3. README.md
4. recipes.js

`index.js`는 첫번째로 지원자님께서 코딩을 해나갈 파일입니다. 보시다시피 파일 내에는 2가지 섹션이 있습니다. 하나는 SQL schema generation이고, 다른 하나는 GraphQL implementation 입니다. 최소한으로 해야하는 부분들에 대해서는 저희가 TODO로 표시를 해두었습니다. 저희가 제공한 가장 기본적인 구조는 간단한 가이드에 지나지 않습니다. 기본적인 구조는 필요에 의해 혹은 추가적인 기능 구현을 위하여 지원자님께서 마음껏 수정하셔도 됩니다.

`recipes.js`는 지원자님께서 어플리케이션을 구현하실 때 사용하실 데이터가 들어있습니다. 한 번 데이터를 빠르게 보시어 데이터의 형태에 익숙해 지시길 추천드립니다.

그 외, `package.json`과 `README.md` 파일이 있습니다..

## Resources

### Apollo GraphQL

앞서 말씀드린대로, Apollo GraphQL Server에 대한 가장 기본적인 지식만 있으면 되니다.

GraphQL에 대한 배경 지식은 아래 공식 문서를 통해 확인 가능하십니다:

- [Introduction to GraphQL](https://graphql.org/learn/)

Apollo GraphQL을 시작하기 위해, 아래 문서를 읽어봐 주세요:

- [Introduction to Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [Getting Started](https://www.apollographql.com/docs/apollo-server/getting-started/)

또한, schema 및 resolver 에 대한 기본 지식은 아래 문서를 참고하시면 됩니다.:

- [Schema basics](https://www.apollographql.com/docs/apollo-server/schema/schema/)
- [Resolvers](https://www.apollographql.com/docs/apollo-server/data/resolvers/)

### SQLite interface

이 과제는 SQLite 데이터베이스를 이용하셔야할 부분들이 있습니다. SQLite 사용에 대해서는 아래 문서를 참조해 주세요:

- [SQLite Reference](https://www.npmjs.com/package/sqlite)

## Requirements

최종 결과물은 food recipe를 추가하고, 보내주는 간단한 백엔드 API를 포함해야 함니다. 아래 단계별로 이 과제에 대한 설명이 있습니다. input validation, error handlings 및 필요한 comments 를 추가하셔도 됩니다.

### Step 0 - Running the assignment

이 과제를 위해서는 node.js가 설치되어 있어야 합니다. 그리고,

    npm install
    node index.js

통해 어플리케이션을 시작하실 수 있습니다. `http://localhost:4000/`로 가셔서 Apollo Studio에 접근 하세요. 그 곳에서 graphql query들을 테스트 해보실 수 있습니다.

### Step 1 - SQL database schema generation

SQL table 에 `recipes.js`에 있는 데이터들을 정의해주세요. 필요하다면, 테이블을 추가하셔도 됩니다. 먼저 이 테이블 스키마를 완성해 주시는 것이 추후 과제를 하는데 필요합니다.

### Step 2 - Recipe data imports

array of objects 의 형태로 되어 있는 `recipes.js`에 있는 데이터를 데이터베이스에 import 해주세요.

### Step 3 - Recipe type

먼저 정의하였던 테이블 schema를 이용하여, API 사용자들이 쉽고 편하게 접근할 수 있도록 Recipe type을 완성해주세요.

### Step 4 - Recipe resolver

Recipe resolver를 위의 타입 정의에 따라 완성해주세요.

### Step 5 - recipeById resolver

recipeById 쿼리를 위해 resolver를 완성해주세요. 이 쿼리는 recipeId를 받아서 아이디에 해당하는 recipe를 리턴하는 간단한 쿼리입니다.

### Step 6 - recipes query & resolver

'recipes' 쿼리와 resolver를 추가해주세요. 이는 데이터베이스 내에 있는 recipe들의 리스트를 이름 오름차순으로 리턴합니다. 카테고리가 주어지면, 카테고리에 해당하는 recipe들만이 리턴되어야 합니다.

### Step 7 - Recipe Input

이 input type은 addRecipe mutation에 사용됩니다. API 사용자가 쉽고, 편하게 이용할 수 있도록 input type을 정의해주세요.

### Step 8 - addRecipe mutation & resolver

'addRecipe' mutation 과 resolver 를 추가해주세요. addRecipe mutation 은 주어진 input value에 따라 새로운 recipe를 데이터베이스에 추가합니다.

## Submission

제출하실 때, 아래의 파일들을 포함해주시길 바랍니다:

1. `index.js` (추가적인 파일이 있다면 추가적인 파일도 함께)
2. `package.json`
3. `YOUR_NAME.md`는 실행 명령어 및 이 과제의 내용에 대한 기능 혹은 구현에 대한 상세 정보를 포함합니다. 그리고 테스트에 사용될 수 있는 gql string도 함께 명시해 주세요.

위 파일들을 압축하여 <footsketch@footsketch.com>으로 보내주세요. 압축 파일 명은
'Backend\_지원자명.zip'이 되어야 합니다. 다시 한번 과제를 진행해주셔서 감사합니다.
