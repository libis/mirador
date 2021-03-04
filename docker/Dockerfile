FROM centos:7

# Install Apache
RUN yum -y update
RUN yum -y install unzip httpd httpd-tools

# Install EPEL Repo
RUN rpm -Uvh https://dl.fedoraproject.org/pub/epel/epel-release-latest-7.noarch.rpm \
 && rpm -Uvh https://mirror.webtatic.com/yum/el7/webtatic-release.rpm

# Install PHP
RUN yum -y install php72w php72w-bcmath php72w-cli php72w-common php72w-gd php72w-intl php72w-ldap php72w-mbstring \
    php72w-mysql php72w-pear php72w-soap php72w-xml php72w-xmlrpc

# Update Apache Configuration
RUN sed -E -i -e '/<Directory "\/var\/www\/html">/,/<\/Directory>/s/AllowOverride None/AllowOverride All/' /etc/httpd/conf/httpd.conf
RUN sed -E -i -e 's/DirectoryIndex (.*)$/DirectoryIndex index.php \1/g' /etc/httpd/conf/httpd.conf

EXPOSE 80

# Start Apache
CMD ["/usr/sbin/httpd","-D","FOREGROUND"]




#FROM ubuntu:16.04
# Install prerequisites

#RUN apt-get update && apt-get install -y \
#apache2 apache2-utils unzip zip php 
EXPOSE 80
#CMD ["apache2ctl", "-D", "FOREGROUND"]


# mirador
#
WORKDIR /tmp
#RUN curl -OL https://github.com/libis/mirador/files/4555240/mirador-2.7.0.zip 
COPY mirador-2.7.0.zip /tmp
	RUN cd /var/www/html/
	RUN mkdir mirador
	RUN cd mirador
	RUN unzip /tmp/mirador-2.7.0.zip 
	RUN cp -R ./ /var/www/html/mirador
    RUN rm -rf /tmp/mirador-2.7.0 
    RUN rm /tmp/mirador-2.7.0.zip
COPY Tutorial_Mirador.pdf /var/www/html/mirador	 
COPY jsonblogFile.php /var/www/html/mirador/bookmark
COPY index.html /var/www/html/mirador 
