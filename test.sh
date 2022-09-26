#!/bin/sh

FORBIDDEN_HTTPS_URL="https://github.com/ehddud1006/Interactive_front.git"
FORBIDDEN_SSH_URL="git@github.com:ehddud1006/Interactive_front.git"
FORBIDDEN_REF="refs/heads/main" # insert branch ref
echo "DO NOT PUSH it main"

remote="$1"
url="$2"

if [ "$url" != "$FORBIDDEN_HTTPS_URL" -a "$url" != "$FORBIDDEN_SSH_URL" ]
then
    exit 0 # Forked Project 에서는 제한하지 않음
fi

if read local_ref local_sha remote_ref remote_sha
then
    if [ "$remote_ref" == "$FORBIDDEN_REF" ]
    then
        echo "DO NOT PUSH it main"
        exit 1 # 금지된 ref 로 push 를 실행하면 에러
    fi
fi

exit 0