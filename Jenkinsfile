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
     stage('Build Docker Image') {
      steps {
        sh 'docker build -t pl.betse.beontime/frontend:latest .'
      }
    }
    stage('Tag Docker Image') {
      steps {
        sh '''docker tag pl.betse.beontime/frontend:latest build-server:5000/pl.betse.beontime/frontend
'''
      }
    }
    stage('Push Docker Image') {
      steps {
        sh 'docker push build-server:5000/pl.betse.beontime/frontend'
      }
    }
    stage('Checkout Deployment Config') {
      steps {
        git(url: 'https://github.com/bepoland-academy/deployment-configuration.git', branch: 'development')
      }
    }
    stage('Docker Compose Pull') {
      steps {
        sh 'docker-compose -H main-server:2376 -f production/docker-compose.yml pull'
      }
    }
    stage('Deploy') {
      steps {
        sh 'docker-compose -H main-server:2376 -f production/docker-compose.yml up -d frontend'
      }
    }
  }
}
