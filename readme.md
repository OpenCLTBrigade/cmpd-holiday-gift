# CPMD Winter Gift Project

![](http://wintergift-ci.codeforcharlotte.org/buildStatus/icon?job=cmpd-holiday-gift-backend)

## We're using Laravel 5.2
Documentation for the framework can be found on the [Laravel website](http://laravel.com/docs).

## Requirements
Install the following requires (for all OSes):

* [Putty (Windows required, Linux/MacOS optional)] (http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)
* [VirtualBox](http://virtualbox.org/)
* [Vagrant](http://vagrantup.com)

## Get set up!

### Clone the repo
Of course you want to do this first. Clone the repository wherever you want!

### Make sure you have SSH keys on Mac/Linux
#### Check that you have id_rsa files
```
cd ~/.ssh
ls -la | grep "id_rsa"
```
#### If not...
```
cd ~/.ssh
ssh-keygen
```
Follow the prompts


### Getting Vagrant/Scotchbox Up-and-running
In terminal/cmd, `cd` into your project directory, then run `vagrant up`. This should initialize
the Scotchbox Vagrant setup. Once the setup is complete you'll be able to use Putty or your Terminal to SSH
in to the box:

#### Windows
1. Open Putty
2. Use "localhost" for the host and "2222" for the port
3. Save configuration, then hit "Open"

#### Linux/macOS
1. Open Terminal
2. `cd /path/to/project/directory`
3. `vagrant ssh`

OR

1. Open Terminal
2. Run `ssh -p 2222 localhost`

The username and password are both **vagrant**

### Installing Dependencies!
Once you are SSH'd into the server, run the following commands to configure the project for use:

1. `cd /var/www/`
2. `composer install`
3. `npm install`
4. `bower install`
5. `gulp`

These will configure all of the dependencies. You'll next need to setup the environment variables. These allow you
to change from the default MySQL db/user/pass:

1. `cp .env.example .env`
2. Modify the values in the new .env as necessary, by default you should not need to modify anything

Next, run all of the database configuration commands:

5. `php artisan key:generate`
6. `php artisan migrate`
7. `php artisan db:seed` 

Once these commands have all been run, you should be able to access the application through your browser at **http://192.168.33.10**. If
all is working well, you should be greeted with the login page.

### Developing
As you may have noticed, all of the files under `/var/www` match the files that you pulled from the repository. You can do all of
your development using your local IDE against the files you pull from the repository. Thanks to Vagrant, these files are automatically tied
in to your Scotchbox setup.


#### Vagrant Halt - Stopping development for the day
You will eventually want to shut down vagrant (so you're not running a virtual machine until your Mac needs its monthly reboot). Do that with:

`vagrant halt`


## Additional Configuration

### Testing emails with Mailtrap.io
1. Register an account with https://mailtrap.io - You can link your github account
2. In your local `.env` file append the credentials and settings Mailtrap lists in your demo inbox.

## Troubleshooting

##### "Class not found"
If you receive a "class not found" error when running migrations, try running the composer dump-autoload command and re-issuing the migrate command.

----
## Package Reference 
#### Permissions - [Entrust](https://github.com/Zizaco/entrust#models)
---
