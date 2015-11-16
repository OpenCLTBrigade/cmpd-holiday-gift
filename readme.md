# CPMD Winter Gift Project

## We're using Laravel 5!
Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

### Requirements
You're going to need **PHP >= 5.5** installed on your machine if you plan on using any of Laravel's command line tools. If you're strictly writing controllers, routes, etc. then read on! We'll get you set up with Vagrant so you won't need to worry about changing things!

Otheriwse OSX users can upgrade their local PHP installation (which is usually 5.3....) here: [http://php-osx.liip.ch/](http://php-osx.liip.ch/)

## Get set up!

### Clone the repo
Of course you want to do this first. Rather than use composer to install things, all of the vendor components are included this way you don't have to figure out a workaround when composer complains it doesn't like your machine's setup.

### Install Vagrant

Instead of changing your environment to work with the software, you can install a Vagrant box with little hassle!

#### Download these if you haven't already
- Install [VirtualBox](http://virtualbox.org/)
- Install [Vagrant](http://vagrantup.com)

#### Edit your hosts file
**OSX** - /etc/hosts

Add the following line

`192.168.10.10 homestead.app`

#### Launch Vagrant from the command line
Open a terminal / "command prompt" window (depending on your OS), cd (or dir...) into the project directory and run `vagrant up`.

#### Access!
You should now be able to access the application from [http://homestead.app](http://homestead.app)

#### Vagrant Halt
You will eventually want to shut down vagrant (so you're not running a virtual machine until your Mac needs its monthly reboot). Do that with

`vagrant halt`

## Get started!

### database migrations
Please use Laravel's artisan migrations to set up the database. That's how we started doing this and if you make changes on your own things are going to get bad real fast.

Run your migrations with

`php artisan migrate`

[Learn about Migrations here](http://laravel.com/docs/5.1/migrations#generating-migrations)

#### Troubleshooting

##### "Class not found"
If you receive a "class not found" error when running migrations, try running the composer dump-autoload command and re-issuing the migrate command.


## API Reference

### user

### household

### child