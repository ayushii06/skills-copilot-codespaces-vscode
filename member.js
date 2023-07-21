function skillsMember()
{
    var member = document.getElementById("member").value;
    var result = "";
    if (member == "Yes")
    {
        result = "You are a member!";
    }
    else
    {
        result = "You are not a member!";
    }
    document.getElementById("memberResult").innerHTML = result;
}
