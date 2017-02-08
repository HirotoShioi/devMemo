i18n.map('en', {

  landing: {
    gettingStarted: 'Getting Started',
    subtitle: 'Make your bookmarking fun',
    easyToUse: {
      title: 'Easy to use',
      description: 'iine!! is easy to use. It is as same as bookmarking in you browser.',
    },
    wellDesigned: {
      title: 'Well Designed',
      description: 'Using the Materialize css framework, iine!! is well-designed',
    },
    realTime: {
      title: 'Reactive',
      description: `Using Meteor reactivity, you'll feel as though you're using desktop app.`,
    }
  },

  home: {
    favorites: 'Favorites',
    recentlyViewed: 'Recently Viewed',
    forYou: 'For You',
    noFavorite: 'Add your favorites here',
    noRecent: 'No recent bookmark',
    noRecommend: 'No recommendation',
    more: 'more',
    hide: 'hide',
  },

  gallery: {
    hideExpired: 'Hide old boookmark',
    noMemoFound: 'No bookmark found',
    filter: {
      label: "Sort by",
      newest: "Date",
      mostClicked: "Click count",
      byLabels: "Labels",
    }
  },

  pageTitle: {
    home: 'Home',
    gallery: 'Gallery',
    memoDetail: 'details',
    notification: 'Notifications',
  },

  search: {
    title: 'Search',
    placeholder: 'Search',
    frequentlyUsed: 'Frequently Used',
    searchResult: 'Search result',
    noResultsFound: 'No results found',
    more: 'more',
    noLabel: `Add label to organize`,
    noMemosFound: 'Add bookmark for search'
  },

  label: {
    title: 'Label',
  },

  labelDetail: {
    addUser: 'Add user'
  },

  settings: {
    title: "Settings",
    username: {
      label: "Username",
    },
    language: {
      label: "Language Settings",
    },
    save: "Save settings",
    success: "Profile saved",
    usernameExists: "Username already exists",
    settingsNotify: "Please set your settings before using the application"
  },

  notification: {
    share: {
      title: "Share label",
      success: 'Started sharing {$1}',
      request: {
        message: "{$1} has requested to share label with you",
        noRequestReceived: "No requests received",
      },
      status: {
        sendRequestMessage: "Share your memos and labels with other people",
        message: "Sending request to share label with {$1}",
        accepted: "Sharing",
        denied: "Canceled",
        pending: "Pending",
      },
      action: {
        accept: "Share",
        deny: "Cancel",
      },
    },
    tabs: {
      requests: "Requests",
      status: "Status"
    },
  },

  sideNav: {
    addMemo: 'Bookmark',
    featured: 'Home',
    memos: 'Gallery',
    search: 'Search',
    labels: 'Labels',
    settings: 'Settings',
    notification: "Notification"
  },

  accounts: {
    signIn: 'Sign in',
    signOut: 'Sign out',
  },

  footer: {
    footerText: 'Made with Meteor'
  },

  forms: {
    addLabel: {
      title: 'Add Label',
    },

    addMemo: {
      title: 'Add bookmark',
      submit: 'Add',
      success: 'Bookmark added',
    },

    editLabel: {
      title: 'Edit Label',
    },

    deleteLabel: {
      title: 'Delete Label',
      messages: 'Are you sure you want to delete',
      deleteMemo: 'Delete related memos as well',
      submit: 'Delete',
    },

    addShareUser: {
      title: 'Share label with other user',
      success: 'Request successfuly sent'
    },

    leaveShareLabel: {
      title: 'Leave Label',
      message: 'Are you sure you wan to leave',
      submit: 'Leave'
    },
  },

  memo: {
    more: 'more',
    addComments: 'Add comment',
    comments: 'comments:',
  },

  errors: {
    requestAlreadySent: "Request already sent",
    userDoesNotExist: "User does not exist",
    notAuthorized: "Not authorized",
    unknownError: '不明なエラーです',
  },
});

i18n.map('ja', {
  landing: {
    gettingStarted: 'iine!!を始める',
    subtitle: 'ブックマークを楽しく',
    easyToUse: {
      title: '簡単な操作',
      description: 'iine!!はブラウザのブックマークのように簡単に操作できます',
    },
    wellDesigned: {
      title: '洗練されたデザイン',
      description: 'Materializeフレームワークを利用した洗練されたデザイン',
    },
    realTime: {
      title: 'リアルタイム',
      description: `Meteorのリアルタイム性を利用することにより、デスクトップアプリのような操作性を感じられます`,
    }
  },

  home: {
    favorites: 'お気に入り',
    recentlyViewed: '最近',
    forYou: 'あなたへのおすすめ',
    noFavorite: 'お気に入りを追加しよう',
    noRecent: '最近追加したものはありません',
    noRecommend: 'オススメはまた今度',
    more: 'もっと見る',
    hide: '隠す',
  },

  gallery: {
    hideExpired: '過去のブックマークを隠す',
    noMemoFound: 'メモは見つかりませんでした',
    filter: {
      label: "並べ替え",
      newest: "作成日",
      mostClicked: "クリック回数",
      byLabels: "ラベル",
    }
  },

  pageTitle: {
    home: 'ホーム',
    gallery: 'ギャラリー',
    memoDetail: '詳細',
    notification: '通知',
  },

  search: {
    title: '検索',
    placeholder: '検索する',
    frequentlyUsed: 'よく使う',
    searchResult: '検索結果',
    noResultsFound: '見つかりませんでした',
    more: 'more',
    noLabel: `ラベルを追加しましょう`,
    noMemosFound: 'ブックマークを追加しましょう'
  },

  label: {
    title: 'ラベル',
  },

  labelDetail: {
    addUser: 'ユーザー追加'
  },

  settings: {
    title: "設定",
    username: {
      label: "ユーザーネーム",
    },
    language: {
      label: "言語設定",
    },
    save: "設定を保存する",
    success: "設定は保存されました",
    usernameExists: "そのユーザー名は既に使用されています",
    settingsNotify: "初期設定を行ってください"
  },

  notification: {
    share: {
      title: "ラベルの共有",
      success: "{$1}の共有を開始しました",
      request: {
        noRequestReceived: "ラベル共有のリクエストはありません",
        message: "{$1}からラベル共有のリクエストが来ています",
      },
      status: {
        message: "{$1}にラベルの共有をリクエストしています",
        accepted: "共有中",
        denied: "キャンセル",
        pending: "保留中",
        sendRequestMessage: "他のユーザーとあなたのメモ、ラベルを共有しましょう",
      },
      action: {
        accept: "共有する",
        deny: "キャンセル",
      },
    },
    tabs: {
      requests: "リクエスト",
      status: "ステータス"
    },
  },

  sideNav: {
    addMemo: 'ブックマーク',
    featured: 'ホーム',
    memos: 'ギャラリー',
    search: '探す',
    labels: 'ラベル',
    settings: '設定',
    notification: "通知"
  },

  accounts: {
    signIn: 'サインイン',
    signOut: 'サインアウト',
  },

  footer: {
    footerText: 'Made with Meteor'
  },

  forms: {
    addLabel: {
      title: 'ラベルを追加する',
    },

    addMemo: {
      title: 'ブックマークを追加する',
      submit: '追加',
      success: 'ブックマークが追加されました',
    },

    editLabel: {
      title: 'ラベル名変更',
    },

    deleteLabel: {
      title: 'ラベル削除',
      messages: 'このラベルを削除してもいいですか',
      deleteMemo: 'ラベルに関するブックマークも一緒に消去する',
      submit: '削除',
    },

    addShareUser: {
      title: 'ユーザーとラベルを共有する',
      success: 'リクエストを送信しました',
    },

    leaveShareLabel: {
      title: '共有をやめる',
      message: 'このラベルの共有をやめますか',
      submit: 'やめる',
    },
  },

  memo: {
    more: 'more',
    addComments: 'コメントを追加',
    comments: 'コメント数：',
  },

  errors: {
    requestAlreadySent: "リクエスト済みです",
    userDoesNotExist: "ユーザーは存在しません",
    notAuthorized: "権限がありません",
    unknownError: '不明なエラーです',
  },
});
