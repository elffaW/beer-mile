$LogPath = Split-Path $MyInvocation.MyCommand.Path
Get-ChildItem "$LogPath\*.log" | 
Where LastWriteTime -LT (Get-Date).AddDays(-15) | Remove-Item -Confirm:$false
$LogPathName = Join-Path -Path $LogPath 
-ChildPath "$($MyInvocation.MyCommand.Name)-$(Get-Date -Format 'MM-dd-yyyy').log"
Start-Transcript $LogPathName -Append

$StartDate = (Get-Date)

#dash button script. Change the $dashButtonMac variable to the address of the dash button.

$dashButtonMac = "68:54:fd:27:a0:ba"

$endpoint = new-object System.Net.IPEndPoint ([system.net.ipaddress]::any, 67)
$listenHost = new-object System.Net.Sockets.UdpClient
$listenHost.Client.SetSocketOption([System.Net.Sockets.SocketOptionLevel]::Socket, 
[System.Net.Sockets.SocketOptionName]::ReuseAddress, $True);
$bindEndPoint = new-object System.Net.IPEndPoint([system.net.ipaddress]::any, 67)
$listenHost.client.Bind($bindEndPoint)

$delay = Get-Date

while($true){
    $payload = $listenHost.Receive([ref] $endpoint)
    if($payload[0] -eq 1 -and $payload[242] -eq 3 -and ((Get-Date) - $delay).seconds -gt 5)
          { #filter for DHCP Request messages only. byte 242 checks option 53's value of 3
        $delay = Get-Date
        $clientMac = 0,0,0,0,0,0
        [array]::Copy($payload, 28,$clientMac,0,6)
        for($i = 0; $i -lt $clientMac.Count; $i++){
            $clientMac[$i] = "{0:x2}" -f $clientMac[$i]
        }
        $mac = $clientMac -join ':'
        if($mac -eq $dashButtonMac){
            Write-Output ("Dash Button has been detected : " + $mac)
            # do something
        }
        else{
            Write-Output ("Valid DHCP Request message obtained but not from Dash button : " + $mac)
            # optionaly do something else
        }
    }
    Start-Sleep -Milliseconds 100
}