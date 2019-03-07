pipeline {
  agent any
  stages {
    stage('Checkout Sources') {
      steps {
        git(url: 'https://github.com/bepoland-academy/frontend.git', branch: 'development')
      }
    }
    stage('Npm install') {
      steps {
        sh 'npm install'
      }
    }
    stage('Ng Build') {
      steps {
        sh 'ng build'
      }
    }
  }
}