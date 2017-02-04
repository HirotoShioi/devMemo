import { HttpBasicAuth } from 'meteor/jabbslad:basic-auth';

const basicAuthUser = process.env.BASIC_AUTH_USERNAME;
const basicAuthPass = process.env.BASIC_AUTH_PASSWORD;

// 環境変数 BASIC_AUTH_USERNAME と BASIC_AUTH_PASSWORD の
// 両方が設定されている時のみ BASIC 認証を有効化
if (basicAuthUser && basicAuthPass) {
  const basicAuth = new HttpBasicAuth(basicAuthUser, basicAuthPass);
  basicAuth.protect();
}
