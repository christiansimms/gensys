FROM centos:centos8

RUN yum update -y && yum clean all

RUN yum groupinstall -y "Development tools"

# Install specific libs requires for Python to build
RUN yum install -y zlib-devel bzip2-devel openssl-devel libffi-devel readline-devel expat-devel gdbm-devel sqlite-devel libpq-devel

# Needed by Pillow:
RUN yum install -y libjpeg-devel

# Get ready to download and compile
RUN yum install -y autoconf automake libtool

# Download Python and compile
ENV PYTHON_VERSION 3.8.3

RUN cd /opt \
    && curl -O https://www.python.org/ftp/python/$PYTHON_VERSION/Python-$PYTHON_VERSION.tar.xz \
    && tar xf Python-$PYTHON_VERSION.tar.xz && cd Python-$PYTHON_VERSION \
    && ./configure --prefix=/usr/local --enable-shared LDFLAGS="-Wl,-rpath /usr/local/lib" \
    && make \
    && make altinstall && cd /opt \
    && rm -f Python-$PYTHON_VERSION.tar.xz \
    && rm -rf Python-$PYTHON_VERSION/

# Set timezone before we leave root.
RUN ln -snf /usr/share/zoneinfo/America/New_York /etc/localtime

# Create app user. Set uid to 1000 so that volume mounting works properly on Mac OSX.
RUN useradd -ms /bin/bash --uid 1000 gensys

# Make log directory. Must be done as root. And after user is created.
RUN mkdir -p /var/log/gensys \
    && chown gensys:gensys /var/log/gensys

# Become app user.
USER gensys
WORKDIR /home/gensys
RUN /usr/local/bin/python3.8 -m venv pysandbox

# Activate it each time:
RUN echo "source /home/gensys/pysandbox/bin/activate" >> /home/gensys/.bashrc

# Change directory to directory to run app.
RUN mkdir -p /home/gensys/app
WORKDIR /home/gensys/app

# Install python packages. Must be done after WORKDIR is set.
# Refresh with: pip freeze > server/requirements.txt
COPY requirements.txt /tmp/
RUN /home/gensys/pysandbox/bin/pip install --no-cache-dir -r /tmp/requirements.txt

# Make able to run our package.
RUN echo /home/gensys/app > /home/gensys/pysandbox/lib/python3.8/site-packages/gensys.egg-link
RUN echo /home/gensys/app > /home/gensys/pysandbox/lib/python3.8/site-packages/easy-install.pth

# Create .envvars file, which has common env. variable settings needed by app and cron.
# Use it now (so that it's in the running docker image), and put it in bash for the future.
COPY envvars_docker /home/gensys/.envvars
# RUN . /home/gensys/.envvars   -- too bad this doesn't work, so instead hard-code:
ENV LD_LIBRARY_PATH /usr/lib
RUN echo "source /home/gensys/.envvars" >> /home/gensys/.bashrc

# Also needed by cron jobs
COPY development.ini /home/gensys/.gensys.ini

# Export the port where the app is running.
EXPOSE 6540

