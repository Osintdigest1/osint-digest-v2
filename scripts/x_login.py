from twscrape import AccountsPool
import asyncio

async def main():
    pool = AccountsPool()

    await pool.add_account(
        "Funtweetsstuff",
        "Deepu@88888",
        "deeptwt1@gmail.com",
        "YOUR_EMAIL_PASSWORD"  # optional, can be ""
    )

    await pool.login_all()

asyncio.run(main())