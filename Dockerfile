FROM nginx:1.9.7

MAINTAINER Lukasz Franczuk <l.franczuk@be-tse.com>


COPY nginx.conf /etc/nginx/nginx.conf

ADD dist/beOnTime /etc/nginx/html

CMD ["nginx", "-g", "daemon off;"]
