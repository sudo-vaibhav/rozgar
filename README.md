<h1>Rozgar - Post Covid Employment App</h1>

Rozgar is a humble app that aims to bring employment to the poorest of the poor of our country who don't have Whatsapp or Linkedin to search for jobs. 

link to the NodeJS backend for this app : https://github.com/sudo-vaibhav/apptitude
# The Problems This Solves
## For  Workers
<img align="center" height="600px" src="https://images.unsplash.com/photo-1531668361947-d00e652ac030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
<br />
We all know the plight of migrant labourers post-COVID-19.
A lot of the daily-wage-workers rushed to their homes in villages when the lockdown was instated. Now that these restrictions are being lifted, it's a real challenge for them to find employment. A lot of old businesses have been shut down and many others are running at a reduced capacity. Workers can use their simple 2G Feature Phones to register themselves on a nationwide database of workers actively seeking for employment by just sending a message.

The message will be sent to a toll free number in the following format:

```
<pin-code> <skill-code>
```

Here pin-code is the pin code of the location the worker wants to find employment in and skill-code represents the following skills:
<table>
  <tr>
    <th>Skill Code</th>
    <th>Skill</th>
  </tr>

  <tr>
    <td>
      1
    </td>
    <td>
      driver
    </td>
  </tr> 
    <tr>
      <td>
        2
      </td>
      <td>
        labourer
      </td>
    </tr>
    <tr>
      <td>
        3
      </td>
      <td>
        maid
      </td>
    </tr>
    <tr>
      <td>
        4
      </td>
      <td>
        guard
      </td>
    </tr>
    <tr>
      <td>
        5
      </td>
      <td>
        carpenter
      </td>
    </tr>
    <tr>
      <td>
        6
      </td>
      <td>
         plumber
      </td>
    </tr>
    <tr>
      <td>
        7
      </td>
      <td>
        electrician
      </td>
    </tr>
</table>

This adds the worker to the worker database and automatically finds the district of the worker like this:
<img src="https://i.ibb.co/tDg0QwQ/Group-4.png" alt="Group-4" border="0">
<br />
Now the worker will be listed in the Rozgar app for being hired by a potential employer. 

## For  Employers

<img src="https://analyticsindiamag.com/wp-content/uploads/2019/12/How-SMBs-In-India-Can-Unlock-Their-Potential-With-Analytics.jpg" />

Employers have been hit really hard by a shortage of both skilled and unskilled workers. These employers can use our app to provide the pin code of their home or workplace and their requirement(maid, labourer) etc. to search for relevant workers near them. The employers can then contact these workers and hire them. So there's a win-win situation for both the hiring and the hired.

## Getting Started
**Note:** Make sure your Flutter environment is setup.

#### Installation

In the command terminal, run the following commands:

    $ git clone https://github.com/vasumanhas000/rozgar-app.git
    $ cd rozgar-app
    $ flutter run

# Simulate for iOS
#### Method One
    
    Open the project in Xcode from ios/Runner.xcodeproj.
    Hit the play button.

#### Method Two

    Run the following command in your terminal.
    $ open -a Simulator
    $ flutter run

# Simulate for Android

    Make sure you have an Android emulator installed and running.
    Run the following command in your terminal.
    $ flutter run

##### Check out Flutter’s online [documentation](http://flutter.io/) for help getting start with your Flutter project.

