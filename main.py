from clint.textui import colored, puts
import json

with open("episode_db.json") as f:
    SEASONS = json.loads(f.read())

VALID_HOME_ACTIONS = ['h', '1', '2', 'q']


def app_greeting():
    """
    Prints the app header/greeting.
    Shown one time when the app starts.
    :return: None
    """
    puts(colored.cyan("WELCOME TO THE WEST WING EPISODE INFO RETRIEVER!\n"))


def show_nav_options(view=None):
    """
    Shows the allowed user options.
    Default value of None shows options for main/home view.

    :param: view option as string or value None
    :return: None
    """
    if view is None or view == "about":
        puts(colored.yellow("--------------- NAVIGATION ---------------------"))
        puts(colored.yellow("Options:\tH - Home\t\t1 - About\n\t\t2 - Find an episode\tQ - Quit\n"))
        puts(colored.yellow(("help\t help [option] - help on specific option\n")))
        puts(colored.yellow("------------------------------------------------\n"))


def display_about():
    print("------------- ABOUT THE APP ----------------------\n\n")
    print("The West Wing Episode Info Retriever was created to allow users"
          " to easily find interesting information about specific West Wing "
          "television episodes. Use the navigation options displayed on the "
          "home view to select "
          "a specific episode's information.\n")
    puts(colored.cyan("About The West Wing Series\n"))
    print("The West Wing was a drama series that ran on NBC from 1999 through "
          "2006. The show follows the fictional presidency of US President "
          "Josiah Bartlet and his staff.\n")
    puts(colored.cyan("How to Use the App\n"))
    print("An action menu will always be displayed so that you know what "
          "your options are. Remember, you can always go home by selecting "
          "'h' or leave the app by selecting 'q'.\n"
          "More detailed information is available through 'help "
          "[option]', which will show information about a specific option.\n"
          "------------------------------------------------\n")


def get_ep_numbers():
    """
    Prompt user for episode and season numbers
    :return: Episode and season numbers as integers
    """
    season_number = int(input("Please enter the season number (1-7): "))
    ep_number = int(input("Please enter the episode number (1-22): "))
    return season_number, ep_number


def display_ep(numbers):
    """
    Display the requested episode information
    :param numbers: season and episode number as tuple
    :return: None
    """
    season_num = numbers[0]
    ep_num = numbers[1]
    season = None
    episode = None
    for s in SEASONS['seasons']:
        if s['seasonNumber'] == season_num:
            season = s
    for ep in season['episodes']:
        if ep['episodeNumber'] == ep_num:
            episode = ep

    if season is None or episode is None:
        print("An error occurred. Taking you back to the home view . . .")
        return

    puts(colored.cyan(f"\n--- Season {season_num}, Episode {ep_num}: {episode['episodeName']} ---"))
    print(f"Date Aired: {episode['dateAired']}")
    writers = [writer['firstName']+ ' ' + writer['lastName'] for writer in episode['writer']]
    print(f"Writer(s): {' '.join(writers)}")
    print(f"Synopsis: {episode['briefSummary']}\n")

    parsed_input = ''
    while parsed_input != 'h' or parsed_input != 'q':
        puts(colored.yellow("Episode Options:\tC - View cast list\tP - View plot summary\n"))
        puts(colored.yellow("General Options:\tH - Home\t\tQ - Quit\thelp [option] - help on a specific option"))
        user_input = input("Select an option: ")
        parsed_input = parse_user_input(user_input)

        if parsed_input[0] == 'h':
            return
        elif parsed_input[0] == 'q':
            parsed_input = confirm_leave_app()
        elif parsed_input[0] == 'p':
            print(f"\nPlot: {episode['expandedSummary']}\n")


def display_help_topic(topic="2"):
    """
    Displays information about the selected help topic.
    :param topic:
    :return:
    """
    if topic == "2":
        puts(colored.cyan(f"\n--- Help Topic: Find a Specific Episode ---"))
        print(f"To read information about a specific West Wing episode, type 2."
              f" YOu will then be asked to provide the season number and the "
              f"episode number. After entering this information, the overview "
              f"for the episode will be displayed for you to read.\n")


def parse_user_input(inpt):
    """
    Handles parsing user input.
    :param inpt: user input as string
    :return: parsed user input or error message as list
    """
    inpt = inpt.lower().strip().split()
    final_inpt = None

    if len(inpt) == 1:
        final_inpt = inpt[0]
    elif len(inpt) == 2 and inpt[0] == "help":
        if inpt[1] not in VALID_HOME_ACTIONS:
            final_inpt = ["Error", "Help usage: 'help [option]'"]
        else:
            final_inpt = inpt
    else:
        final_inpt = ["Error", "We don't recognize that option. Please review "
                      "the navigation menu and select an option."]

    return final_inpt


def confirm_leave_app():
    """
    Prints a goodbye message and exits the app.
    Shown one time when a user confirms leaving the app.
    :return: user confirmation as string
    """
    user_confirm = input("Do you really want to leave? (y/n): ")
    if (user_confirm.lower().strip() == "y"
            or user_confirm.lower().strip() == "yes"):
        puts(colored.cyan("\nThank you for using this app! Goodbye!"))
        exit()
    else:
        return "n"


def main():
    # Set initial user_view value to show home view
    user_view = None
    # app_greeting()

    # Set initial user_input to an empty string
    user_input = ''

    # Show selected views and menu options as long as user chooses to use
    # app
    while user_input.lower() != 'q':
        # Print initial nav options
        if user_view is None:
            app_greeting()
        show_nav_options()
        # prompt for user input
        user_input = input("Select an option: ")
        # Parse user input and perform requested action
        parsed_user_input = parse_user_input(user_input)

        if parsed_user_input[0] == "h":
            user_view = None
        elif parsed_user_input[0] == "help":
            user_view = "help"
            display_help_topic(parsed_user_input[1])
        elif parsed_user_input[0] == "1":
            user_view = "about"
            display_about()
        elif parsed_user_input[0] == "2":
            user_view = "None"
            req_nums = get_ep_numbers()
            display_ep(req_nums)
        elif parsed_user_input[0] == "q":
            if confirm_leave_app() == "n":
                user_input = ""
        elif parsed_user_input[0] == "Error":
            print(parsed_user_input[1])


if __name__ == '__main__':
    # wrapper(main)
    main()
