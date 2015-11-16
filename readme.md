# CPMD Winter Gift Project

## We're using Laravel 5!
Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

### Requirements
You're going to need **PHP >= 5.5** installed on your machine if you plan on using any of Laravel's command line tools. If you're strictly writing controllers, routes, etc. then read on! We'll get you set up with Vagrant so you won't need to worry about changing things!

Otheriwse OSX users can upgrade their local PHP installation (which is usually 5.3....) here: [http://php-osx.liip.ch/](http://php-osx.liip.ch/)

## Get set up!

### Clone the repo
Of course you want to do this first. Clone the repository.

### Install Dependencies!
In a terminal, `cd` (or `dir` on Windows) into your project directory. Make sure composer is installed on your computer, then run

`composer install`

This may take a while. Keep the terminal open; we'll come back to it shortly. 

### Install Vagrant

Instead of changing your environment to work with the software, you can install a Vagrant box with little hassle!

#### Download these if you haven't already
- Install [VirtualBox](http://virtualbox.org/)
- Install [Vagrant](http://vagrantup.com)

#### Edit your hosts file
**OSX** - /etc/hosts

Add the following line

`192.168.10.10 homestead.app`

### Configure Homestead (Vagrant Box)
In your terminal, make sure you're in the project root and run...

OSX:

`php vendor/bin/homestead make`

Windows 

`vendor\bin\homestead make`

This generates a homestead.yaml file and lets you launch vagrant from the command line; our next task.

#### Launch Vagrant from the command line
Open a terminal / "command prompt" window (depending on your OS), cd (or dir...) into the project directory and run `vagrant up`.

#### Access!
You should now be able to access the application from [http://homestead.app](http://homestead.app)

#### Vagrant Halt
You will eventually want to shut down vagrant (so you're not running a virtual machine until your Mac needs its monthly reboot). Do that with

`vagrant halt`

## Get started!

### SSH into the Vagrant box
You should be able to do

`ssh vagrant@homestead.app`

to work within the Vagrant box. 

### database migrations
Please use Laravel's artisan migrations to set up the database. That's how we started doing this and if you make changes on your own things are going to get bad real fast.

Run your migrations with

`php artisan migrate`

[Learn about Migrations here](http://laravel.com/docs/5.1/migrations#generating-migrations)

#### Troubleshooting

##### "Class not found"
If you receive a "class not found" error when running migrations, try running the composer dump-autoload command and re-issuing the migrate command.

----
### Package Reference 
#### Permissions - [Entrust](https://github.com/Zizaco/entrust#models)
---

# API Reference

### user

### household

### child